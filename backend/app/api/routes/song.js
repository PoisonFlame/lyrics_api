const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const songsController = require('../controllers/song');

router.get('/', checkAuth, songsController.songs_get_all);

router.post('/', checkAuth, songsController.songs_create_song);

router.get('/by-name/:song', checkAuth, songsController.songs_get_by_name);

router.get('/add/:keyword', checkAuth, songsController.songs_add_by_keyword);

router.get('/by-album/:album', checkAuth, songsController.songs_get_by_album);

router.get('/by-artist/:artist', checkAuth, songsController.songs_get_by_artist);

router.get('/by-id/:songId', checkAuth, songsController.songs_get_by_id);

router.patch('/by-id/:songId', checkAuth, songsController.songs_update_by_id);

router.delete('/by-id/:songId', checkAuth, songsController.songs_delete_by_id);

module.exports = router;