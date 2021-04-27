import React from "react";
import moment from "moment";
import { Card, CardActions, CardMedia, CardContent, Button, Typography } from '@material-ui/core'
import ThumbUpAltICon from '@material-ui/icons/ThumbUpAlt'
import DeleteICon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import useStyles from './styles'
import {useDispatch} from "react-redux";
import {deletePost, likePost} from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {

    const dispatch = useDispatch()
    const classes = useStyles()
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6"> {post.creator} </Typography>
                <Typography variant="body2"> {moment(post.createdAt).fromNow()} </Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size='small' onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize='default' />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color='textSecondary'> {post.tags.map((tag) => `#${tag.trim()} `)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom> {post.title} </Typography>
            <CardContent>
                <Typography variant="body2" color='textSecondary' component="p"> {post.message} </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' onClick={() => dispatch(likePost(post._id))} >
                    <ThumbUpAltICon fontSize='small' />
                    &nbsp; J'aime &nbsp;
                    {post.likeCount}
                </Button>
                <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))} >
                    <DeleteICon fontSize='small' />
                    Supprimer
                </Button>
            </CardActions>
        </Card>
    )
}
export default Post