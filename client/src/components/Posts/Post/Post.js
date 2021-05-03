import React from "react";
import moment from "moment";
import { Card, CardActions, CardMedia, CardContent, Button, Typography } from '@material-ui/core'
import ThumbUpAltICon from '@material-ui/icons/ThumbUpAlt'
import DeleteICon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import useStyles from './styles'
import {useDispatch} from "react-redux";
import {deletePost, likePost} from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const user = JSON.parse(localStorage.getItem('profile'));
    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAltICon fontSize="small" />&nbsp;{post.likes.length > 2 ? `Toi et ${post.likes.length - 1} d'autre` : `${post.likes.length} aime${post.likes.length > 1 ? 'nt' : ''}` }</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? "J'aime" : "J'aimes"}</>
                );
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;J'aime</>
    }
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6"> {post.name} </Typography>
                <Typography variant="body2"> {moment(post.createdAt).fromNow()} </Typography>
            </div>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div className={classes.overlay2}>
                    <Button style={{color: 'white'}} size='small' onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize='default' />
                    </Button>
                </div>
            )}
            <div className={classes.details}>
                <Typography variant="body2" color='textSecondary'> {post.tags.map((tag) => `#${tag.trim()} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom> {post.title} </Typography>
            <CardContent>
                <Typography variant="body2" color='textSecondary' component="p"> {post.message} </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' disabled={!user?.result} onClick={() => dispatch(likePost(post._id))} >
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))} >
                        <DeleteICon fontSize='small' />
                        Supprimer
                    </Button>
                )}
            </CardActions>
        </Card>
    )
}
export default Post