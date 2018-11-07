SELECT l.id as list_id, l.name,li.id,li.title,li.overview,li.release_date,li.score,li.poster_path FROM users u
JOIN lists l
ON l.user_id = u.id
LEFT OUTER JOIN list_items li
ON l.id = li.list_id
WHERE u.username = ${username};