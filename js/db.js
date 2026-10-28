/**
 * OWNER: Member 4 (Database API Calls)
 * Database: Supabase
 * Table: leaderboard
 */

import { supabase } from './supabase-client.js';

/**
 * Fetch the top 10 winning scores.
 * Sort by moves (ascending), then time_seconds (ascending).
 * Returns an empty array if an error occurs.
 */
export async function fetchTopScores() {
    try {
        const { data, error } = await supabase
            .from('leaderboard')
            .select('id, created_at, nickname, moves, time_seconds, is_win')
            .eq('is_win', true)
            .order('moves', { ascending: true })
            .order('time_seconds', { ascending: true })
            .limit(10);

        if (error) {
            console.error('Error fetching leaderboard:', error);
            return [];
        }

        return data ?? [];

    } catch (error) {
        console.error('Unexpected error fetching leaderboard:', error);
        return [];
    }
}


/**
 * Submit a player's winning score to the leaderboard.
 * Returns true if successful, false otherwise.
 */
export async function submitScore(nickname, moves, timeSeconds) {
    try {
        // Validate the input.
        if (
            typeof nickname !== 'string' ||
            nickname.trim().length === 0 ||
            !Number.isInteger(moves) ||
            moves < 0 ||
            !Number.isInteger(timeSeconds) ||
            timeSeconds < 0
        ) {
            console.error('Invalid score data.');
            return false;
        }

        const { error } = await supabase
            .from('leaderboard')
            .insert([
                {
                    nickname: nickname.trim(),
                    moves: moves,
                    time_seconds: timeSeconds,
                    is_win: true
                }
            ]);

        if (error) {
            console.error('Error submitting score:', error);
            return false;
        }

        console.log('Score submitted successfully!');
        return true;

    } catch (error) {
        console.error('Unexpected error submitting score:', error);
        return false;
    }
}