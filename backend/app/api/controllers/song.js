const Song = require('../models/song');
const mongoose = require('mongoose');
const {spawn} = require('child_process')

exports.songs_get_all = (req,res,next) => {
    Song
    .find()
    .exec()
    .then(docs => {
        const response = {
            songs: docs.map(doc => {
                return {
                    id: doc.id,
                    name: doc.name,
                    album: doc.album,
                    artist: doc.artist,
                    genre: doc.genre,
                    lyrics: doc.lyrics,
                    metadata: {
                        lyrics_source: doc.lyrics_source,
                        release_date: doc.release_date,
                        last_updated: doc.updated 
                    }
                }
            }),
            count: docs.length,
            status: 'Success'
        };
        res.status(201).json(response);
    })
    .catch( err => {
        res.status(500).json({
            errors: err,
            status: 'Fail'
        });
    });
}

exports.songs_create_song = (req,res,next) => {
    const song = new Song({
        id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        album: req.body.album,
        artist: req.body.artist,
        genre: req.body.genre,
        lyrics: req.body.lyrics,
        lyrics_id: req.body.lyrics_id,
        release_date: req.body.release_date,
        lyrics_source: req.body.lyrics_source,
    });
    song
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            song: {
            id: result.id,
            name: result.name,
            album: result.album,
            artist: result.artist,
            genre: result.genre,
            lyrics: result.lyrics,
            metadata: {
                lyrics_source: result.lyrics_source,
                release_date: result.release_date,
                last_updated: result.updated
            }
            },
            status : 'Success'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            errors: err,
            status: 'Fail'
        });
    });
}

exports.songs_get_by_name = (req,res,next) => {
    const name = req.params.song;
    Song.find({"name": new RegExp(`^${name}$`,'i')})
    .exec()
    .then(doc => {
        console.log("From database",new RegExp(`^${name}$`,'i'), doc);
        const response = {
            songs: doc.map(doc => {
                return {
                    id: doc.id,
                    name: doc.name,
                    album: doc.album,
                    artist: doc.artist,
                    genre: doc.genre,
                    lyrics: doc.lyrics,
                    metadata: {
                        lyrics_source: doc.lyrics_source,
                        release_date: doc.release_date,
                        last_updated: doc.updated 
                    }
                }
            }),
            count: doc.length,
            status: 'Success'
        };
        if(doc) {
            res.status(201).json(response);
        }else{
        res.status(404).json({message: 'Song(s) not found',status: 'Fail'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({errors: err});
    });
}

exports.songs_add_by_keyword = (req,res,next) => {
    const keyword = encodeURIComponent(req.params.keyword);
    const python = spawn('python3.7', ['/app/api/scripts/ext.py', '-k', keyword]);
    res.status(201).json('Success');
}

exports.songs_get_by_album = (req,res,next) => {
    const album = req.params.album;
    Song.find({"album": new RegExp(`^${album}$`,'i')})
    .exec()
    .then(doc => {
        console.log("From database", doc);
        const response = {
            songs: doc.map(doc => {
                return {
                    id: doc.id,
                    name: doc.name,
                    album: doc.album,
                    artist: doc.artist,
                    genre: doc.genre,
                    lyrics: doc.lyrics,
                    metadata: {
                        lyrics_source: doc.lyrics_source,
                        release_date: doc.release_date,
                        last_updated: doc.updated 
                    }
                }
            }),
            count: doc.length,
            status: 'Success'
        };
        if(doc) {
            res.status(201).json(response);
        }else{
        res.status(404).json({message: 'Song(s) not found',status: 'Fail'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({errors: err});
    });
}

exports.songs_get_by_artist = (req,res,next) => {
    const artist = req.params.artist;
    Song.find({"artist": new RegExp(`^${artist}$`,'i')})
    .exec()
    .then(doc => {
        console.log("From database", doc);
        const response = {
            songs: doc.map(doc => {
                return {
                    id: doc.id,
                    name: doc.name,
                    album: doc.album,
                    artist: doc.artist,
                    genre: doc.genre,
                    lyrics: doc.lyrics,
                    metadata: {
                        lyrics_source: doc.lyrics_source,
                        release_date: doc.release_date,
                        last_updated: doc.updated 
                    }
                }
            }),
            count: doc.length,
            status: 'Success'
        };
        if(doc) {
            res.status(201).json(response);
        }else{
        res.status(404).json({message: 'Song(s) not found',status: 'Fail'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({errors: err});
    });
}

exports.songs_get_by_id = (req,res,next) => {
    const id = req.params.songId;
    Song.find({"id":id})
    .exec()
    .then(doc => {
        console.log("From database", doc);
        const response = {
            songs: doc.map(doc => {
                return {
                    id: doc.id,
                    name: doc.name,
                    album: doc.album,
                    artist: doc.artist,
                    genre: doc.genre,
                    lyrics: doc.lyrics,
                    metadata: {
                        lyrics_source: doc.lyrics_source,
                        release_date: doc.release_date,
                        last_updated: doc.updated 
                    }
                }
            }),
            count: doc.length,
            status: 'Success'
        };
        if(doc) {
            res.status(201).json(response);
        }else{
        res.status(404).json({message: 'Song(s) not found',status: 'Fail'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({errors: err, status: 'Fail'});
    });
}

exports.songs_update_by_id = (req,res,next) => {
    const id = req.params.songId;
    let props = req.body;
    props['updated'] = Date.now();
    console.log(props);
    Song.findOneAndUpdate({ id: id},props, {"new": true})
    .exec()
    .then( result => {
        console.log(result),
        res.status(201).json({
            song: {
            id: result.id,
            name: result.name,
            album: result.album,
            artist: result.artist,
            genre: result.genre,
            lyrics: result.lyrics,
            metadata: {
                lyrics_source: result.lyrics_source,
                release_date: doc.release_date,
                last_updated: result.updated 
            }
            },
            status : 'Success'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            errors: err, 
            status: 'Fail'
        })
    });

}

exports.songs_delete_by_id = (req,res,next) => {
    const id = req.params.songId;
    Song.findOneAndDelete({id: id})
    .exec()
    .then(result => {
        res.status(201).json({
            result,
            message : 'Song removed sucessfully',
            status: 'Success'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            errors: err,
            status: 'Fail'
        });
    });
}