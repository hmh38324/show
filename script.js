// 全局变量
let leaderboardData = [];
let filteredData = [];
let currentGameFilter = 'all';

// 游戏配置
const gameConfig = {
    games: [
        { name: '完美拼图', maxScore: 4, type: 'online' },
        { name: '牌号对对碰', maxScore: 1, type: 'online' },
        { name: '色彩陷阱', maxScore: 4, type: 'online' },
        { name: '数字炸弹', maxScore: 4, type: 'online' },
        { name: '拼速达人', maxScore: 15, type: 'offline' },
        { name: '碰碰乐', maxScore: 15, type: 'offline' },
        { name: '沙包投掷', maxScore: 4, type: 'offline' },
        { name: '巧手取棒', maxScore: 4, type: 'offline' }
    ]
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadLeaderboardData();
    setupEventListeners();
});

// 加载排行榜数据
async function loadLeaderboardData() {
    try {
        const response = await fetch('leadboard.csv');
        const csvText = await response.text();
        leaderboardData = parseCSV(csvText);
        filteredData = [...leaderboardData];
        renderLeaderboard();
        updateStats();
    } catch (error) {
        console.error('加载数据失败:', error);
        showError('数据加载失败，请检查文件是否存在');
    }
}

// 解析CSV数据
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length >= headers.length) {
            const row = {
                rank: parseInt(values[0]),
                id: values[1],
                name: values[2],
                scores: {
                    '完美拼图': parseInt(values[3]) || 0,
                    '牌号对对碰': parseInt(values[4]) || 0,
                    '色彩陷阱': parseInt(values[5]) || 0,
                    '数字炸弹': parseInt(values[6]) || 0,
                    '拼速达人': parseInt(values[7]) || 0,
                    '碰碰乐': parseInt(values[8]) || 0,
                    '沙包投掷': parseInt(values[9]) || 0,
                    '巧手取棒': parseInt(values[10]) || 0
                },
                total: parseInt(values[11]) || 0
            };
            data.push(row);
        }
    }
    
    return data;
}

// 渲染排行榜
function renderLeaderboard() {
    const tbody = document.getElementById('leaderboardBody');
    tbody.innerHTML = '';
    
    if (filteredData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="11" class="no-data">没有找到匹配的数据</td></tr>';
        return;
    }
    
    filteredData.forEach((player, index) => {
        const row = createPlayerRow(player, index);
        tbody.appendChild(row);
    });
}

// 创建玩家行
function createPlayerRow(player, index) {
    const row = document.createElement('tr');
    
    // 排名 - 如果是游戏筛选，显示当前筛选中的排名
    const rankCell = document.createElement('td');
    if (currentGameFilter === 'all') {
        rankCell.textContent = player.rank;
        rankCell.className = getRankClass(player.rank);
    } else {
        rankCell.textContent = index + 1;
        rankCell.className = getRankClass(index + 1);
    }
    row.appendChild(rankCell);
    
    // 工号
    const idCell = document.createElement('td');
    idCell.textContent = player.id;
    row.appendChild(idCell);
    
    // 姓名
    const nameCell = document.createElement('td');
    nameCell.textContent = player.name;
    row.appendChild(nameCell);
    
    // 游戏得分
    gameConfig.games.forEach(game => {
        const scoreCell = document.createElement('td');
        const score = player.scores[game.name];
        scoreCell.textContent = score;
        scoreCell.className = getScoreClass(score, game.maxScore);
        
        // 如果是当前筛选的游戏，高亮显示
        if (currentGameFilter === game.name) {
            scoreCell.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            scoreCell.style.color = 'white';
            scoreCell.style.fontWeight = 'bold';
            scoreCell.style.borderRadius = '8px';
        }
        
        row.appendChild(scoreCell);
    });
    
    // 总分
    const totalCell = document.createElement('td');
    totalCell.textContent = player.total;
    totalCell.className = 'total-score';
    row.appendChild(totalCell);
    
    return row;
}

// 获取排名样式类
function getRankClass(rank) {
    if (rank === 1) return 'rank-1';
    if (rank === 2) return 'rank-2';
    if (rank === 3) return 'rank-3';
    if (rank <= 10) return 'rank-top10';
    if (rank <= 50) return 'rank-top50';
    return '';
}

// 获取得分样式类
function getScoreClass(score, maxScore) {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 100) return 'score-perfect';
    if (percentage >= 80) return 'score-good';
    if (percentage >= 60) return 'score-average';
    return 'score-low';
}

// 设置事件监听器
function setupEventListeners() {
    // 游戏筛选按钮
    const gameTabs = document.querySelectorAll('.game-tab');
    gameTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const gameName = this.getAttribute('data-game');
            switchGameFilter(gameName);
        });
    });
    
    // 搜索功能
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 实时搜索
    searchInput.addEventListener('input', function() {
        if (this.value.length >= 2 || this.value.length === 0) {
            performSearch();
        }
    });
    
    // 排名筛选
    const rankFilter = document.getElementById('rankFilter');
    rankFilter.addEventListener('change', function() {
        filterByRank(this.value);
    });
}

// 切换游戏筛选
function switchGameFilter(gameName) {
    // 更新按钮状态
    document.querySelectorAll('.game-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-game="${gameName}"]`).classList.add('active');
    
    // 更新当前筛选
    currentGameFilter = gameName;
    
    // 重新应用所有筛选
    applyAllFilters();
}

// 应用所有筛选条件
function applyAllFilters() {
    let data = [...leaderboardData];
    
    // 应用游戏筛选
    if (currentGameFilter !== 'all') {
        data = filterByGame(data, currentGameFilter);
    }
    
    // 应用搜索筛选
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    if (searchTerm !== '') {
        data = data.filter(player => 
            player.id.toLowerCase().includes(searchTerm) || 
            player.name.toLowerCase().includes(searchTerm)
        );
    }
    
    // 应用排名筛选
    const rankFilter = document.getElementById('rankFilter').value;
    if (rankFilter !== 'all') {
        data = filterByRankValue(data, rankFilter);
    }
    
    filteredData = data;
    renderLeaderboard();
    updateStats();
}

// 按游戏筛选
function filterByGame(data, gameName) {
    if (gameName === 'all') {
        return data;
    }
    
    // 按该游戏得分排序
    return data.sort((a, b) => {
        const scoreA = a.scores[gameName] || 0;
        const scoreB = b.scores[gameName] || 0;
        return scoreB - scoreA; // 降序排列
    });
}

// 按排名筛选（内部函数）
function filterByRankValue(data, filterValue) {
    switch (filterValue) {
        case 'top10':
            return data.filter(player => player.rank <= 10);
        case 'top50':
            return data.filter(player => player.rank <= 50);
        case 'top100':
            return data.filter(player => player.rank <= 100);
        default:
            return data;
    }
}

// 执行搜索
function performSearch() {
    applyAllFilters();
}

// 按排名筛选
function filterByRank(filterValue) {
    applyAllFilters();
}

// 更新统计信息
function updateStats() {
    const totalCount = document.getElementById('totalCount');
    const displayedCount = filteredData.length;
    const totalParticipants = leaderboardData.length;
    
    let statsText = '';
    
    if (currentGameFilter === 'all') {
        if (displayedCount === totalParticipants) {
            statsText = `总参与人数: ${totalParticipants}人`;
        } else {
            statsText = `显示: ${displayedCount}人 / 总参与人数: ${totalParticipants}人`;
        }
    } else {
        const gameName = currentGameFilter;
        const maxScore = gameConfig.games.find(g => g.name === gameName)?.maxScore || 0;
        const perfectScores = filteredData.filter(p => p.scores[gameName] === maxScore).length;
        
        statsText = `${gameName}排行榜: ${displayedCount}人`;
        if (perfectScores > 0) {
            statsText += ` | 满分人数: ${perfectScores}人`;
        }
    }
    
    totalCount.textContent = statsText;
}

// 显示错误信息
function showError(message) {
    const tbody = document.getElementById('leaderboardBody');
    tbody.innerHTML = `<tr><td colspan="11" class="error-message">${message}</td></tr>`;
}

// 添加一些实用功能
function highlightPlayer(playerId) {
    const rows = document.querySelectorAll('#leaderboardBody tr');
    rows.forEach(row => {
        row.classList.remove('highlighted');
        const idCell = row.querySelector('td:nth-child(2)');
        if (idCell && idCell.textContent === playerId) {
            row.classList.add('highlighted');
            row.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

// 导出功能（可选）
function exportToCSV() {
    const csvContent = generateCSV(filteredData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'leaderboard_filtered.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 生成CSV内容
function generateCSV(data) {
    const headers = ['排名', '工号', '姓名', ...gameConfig.games.map(g => g.name), '总分'];
    const csvRows = [headers.join(',')];
    
    data.forEach(player => {
        const row = [
            player.rank,
            player.id,
            player.name,
            ...gameConfig.games.map(game => player.scores[game.name]),
            player.total
        ];
        csvRows.push(row.join(','));
    });
    
    return csvRows.join('\n');
}

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // Ctrl+F 聚焦搜索框
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // ESC 清空搜索
    if (e.key === 'Escape') {
        document.getElementById('searchInput').value = '';
        performSearch();
    }
});

// 添加打印样式
const printStyles = `
    @media print {
        body { background: white !important; }
        .controls, .legend, .footer { display: none !important; }
        .table-container { box-shadow: none !important; }
        .leaderboard-table { font-size: 12px !important; }
        .leaderboard-table th,
        .leaderboard-table td { padding: 4px !important; }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = printStyles;
document.head.appendChild(styleSheet);
