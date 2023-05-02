import bcrypt from "bcrypt";
import pkg from 'jsonwebtoken';
const { jwt } = pkg;
import User from "../models/User.js"

/* Registered User */
export const register = async(req, res) => {
    try{
        const{
            firstName,
            lastName,
            email,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            picturePath,
            friends,
            location,
            occupation,
            viewwsProfile: Mathfloor(Math.random()* 10000),
            impressions: Mathfloor(Math.random()* 10000)
        });
        const savedUser = await newUser.savedUser
        res.status(201).json(savedUser);

    } catch (err){
        res.status(500).json({error: err.message});
    }
};

/*Logging In*/
export const login = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user) return res.statu(400).json({msg: "User does not exist"});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.statu(400).json({msg: "Invaild Credentials"}); 

        const token = jwt.sign({id: user.id}, processenc.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user});
        
    } catch (err){
        res.status(500).json({error: err.message});
    }
}