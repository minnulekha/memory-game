/**
 * OWNER: Member 2 (Database API Calls)
 */

export async function fetchTopScores() {
    try {
        const response = await fetch('/api/scores');
        if (!response.ok) throw new Error('Failed to fetch scores');
        return await response.json();
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        return [];
    }
}

export async function submitScore(nickname, moves, timeSeconds) {
    try {
        const response = await fetch('/api/scores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nickname: nickname.trim(),
                moves: moves,
                time_seconds: timeSeconds,
                is_win: true
            })
        });
        return response.ok;
    } catch (error) {
        console.error('Error submitting score:', error);
        return false;
    }
}