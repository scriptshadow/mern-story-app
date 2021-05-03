import mongoose from 'mongoose';

import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find()
        res.status(200).json(postMessage)
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}
export const createPost = async (req, res) => {
    const post = req.body
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()})
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message} )
    }
}
export const updatePost = async (req, res) => {
    const {id: _id} = req.params
    const post = req.body
    //const { title, message, creator, selectedFile, tags } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`Aucun contenu trouvé pour l'id: ${_id}`)
    //const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    //await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true })
    res.json(updatedPost)
}
export const deletePost = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Aucun contenu trouvé pour l'id: ${id}`)
    await PostMessage.findByIdAndRemove(id)
    console.log('Supprimée !')
    res.json({ message: "La story a bien été supprimée." });
}
export const likePost = async (req, res) => {
    const {id} = req.params
    if(!req.userId) return res.json({message: "Authentification echouée!"})
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Aucun contenu trouvé pour l'id: ${id}`)
    const post = await PostMessage.findById(id)
    const index = post.likes.findIndex((id) => id === String(req.userId))
    if(index === -1 ) {
        post.likes.push(req.userId)
    }else{
        post.likes = post.likes.filter((id) => id !== String(req.userId) )
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
    res.json(updatedPost)
}