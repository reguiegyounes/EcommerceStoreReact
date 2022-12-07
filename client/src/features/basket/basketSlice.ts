import { createSlice } from "@reduxjs/toolkit"
import { Basket } from "../../app/models/basket";

interface BasketState{
    basket : Basket | null
}

const initialState : BasketState ={
    basket : null
}

export const basketSlice=createSlice({
    name : 'basket',
    initialState : initialState,
    reducers : {
        setBasket : (state,action)=>{
            state.basket = action.payload
        },
        removeItem : (state,action)=> {
            const {productId,quaantity} = action.payload;
            const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);
            if(itemIndex === -1 || itemIndex === undefined) return ;
            state.basket!.items[itemIndex].quantity -= quaantity ;
            if(state.basket?.items[itemIndex].quantity === 0)
                state.basket.items.splice(itemIndex, 1);
        }
    }
});


export const {setBasket,removeItem} = basketSlice.actions