import express from "express";
import {sql} from "../config/db.js";

//CRUD operations here

 //function get all products   
 export const getAllProducts = async (req,res) => {
    try {
        const products=await sql`
        SELECT * FROM products
        ORDER BY created_at DESC
        `;
        console.log("products fetched successfully",products);
        res.status(200).json({success:true,data:products});
    } catch (error) {
        console.log("Error in getAllProducts function",error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
 };

 //function to create a prduct entry in db
 export const createProduct= async (req,res) => {
    const {price,name,image} = req.body;
    if(!name || !price || !image ){
        return res.status(400).json({success:false,message:"All fields are required bhai"});
    }

    try {
        const newProduct = await sql`
        INSERT INTO products (name,price,image)
        VALUES(${name},${price},${image})
        RETURNING *
        `;
        res.status(201).json({success:true,data:newProduct[0]});
    } catch (error) {
        console.log("Error in createProduct function");
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
};

 //funcion to get a specific product by its id
 export const getProduct = async (req,res) =>{
    const {id} = req.params;
    try {
        const product=await sql`
        SELECT * FROM products WHERE id=${id}
        `;
        res.status(200).json({success:true,data:product[0]});
    } catch (error) {
        console.log("Error in getProduct function",error);
        res.status(500).json({success:false,message:"Internal Sever Error"})
    }
 };

 //upadte product data function
 export const updateProduct=async(req,res)=>{
    const {id} = req.params;
    const {name,price,image} = req.body;
    try {
        const updatedProduct=await sql`
        UPDATE products
        SET name=${name},price=${price},image=${image}
        WHERE id=${id}
        RETURNING *
        `;

        //agr product exist hi nahi karta ho toh
        if(updatedProduct.length==0){
            return res.status(400).json({success:false,message:"Product Not Found"})
        }

        res.status(200).json({success:true,data:updatedProduct[0]});
    } catch (error) {
        console.log("Error in update product function",error)
        res.status(500).json({success:false,message:"Internal Sever Error"})
    }
 };

 //function for dleting the product
 export const deleteProduct= async(req,res)=>{
    const {id} = req.params;
    try {
        const deletedProduct=await sql`
        DELETE FROM products WHERE id=${id}
        RETURNING *
        `
        //agr product exist hi nahi karta ho toh
        if(deletedProduct.length==0){
            return res.status(404).json({success:false,message:"Product Not Found"})
        }

        res.status(200).json({success:true,data:deletedProduct[0]});
    } catch (error) {
        console.log("Error in delete product function",error)
        res.status(500).json({success:false,message:"Internal Sever Error"})
    }
 };