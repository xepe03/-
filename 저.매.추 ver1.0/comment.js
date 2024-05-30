document.getElementById('suggestionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const menuName = document.getElementById('menuName').value;
    const reason = document.getElementById('reason').value;
    
    const emailBody = `메뉴 이름: ${menuName}%0D%0A선정 이유: ${reason}`;
    const mailtoLink = `mailto:yuu2xd@gmail.com?subject=새로운 메뉴 건의&body=${emailBody}`;
    
    window.location.href = mailtoLink;
});
document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = "index.html"; // 메인 페이지로 이동
});