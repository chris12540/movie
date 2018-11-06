SELECT l.name, li.title,li.overview,li.release_date,li.score,li.poster_path FROM lists l
JOIN list_items li
ON l.id = li.list_id
WHERE user_id = ${id};