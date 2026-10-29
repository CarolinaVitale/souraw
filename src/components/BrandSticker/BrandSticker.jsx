import React from 'react';
import './BrandSticker.css';
import cookieBox from '../../assets/stickers/cookie-box.webp';
import goodThings from '../../assets/stickers/good-things.webp';
import bakedForYou from '../../assets/stickers/baked-for-you.webp';
import heart from '../../assets/stickers/heart.webp';
import packingBoxes from '../../assets/stickers/packing-boxes.webp';
import coffeeBreak from '../../assets/stickers/coffee-break.webp';
import breadWalk from '../../assets/stickers/bread-walk.webp';
import icedCoffeeGirl from '../../assets/stickers/iced-coffee-girl.webp';
import breadHug from '../../assets/stickers/bread-hug.webp';
import deliveryBoxes from '../../assets/stickers/delivery-boxes.webp';
import pouringCoffee from '../../assets/stickers/pouring-coffee.webp';
import wrappedBaguette from '../../assets/stickers/wrapped-baguette.webp';
import icedCoffee from '../../assets/stickers/iced-coffee.webp';
import croissant from '../../assets/stickers/croissant.webp';

const stickers = { cookieBox, goodThings, bakedForYou, heart, packingBoxes, coffeeBreak, breadWalk, icedCoffeeGirl, breadHug, deliveryBoxes, pouringCoffee, wrappedBaguette, icedCoffee, croissant };

// Decorative artwork never intercepts links, selection or keyboard focus.
export default function BrandSticker({ name, className = '', eager = false }) {
    return <span className={`souraw-sticker ${className}`} aria-hidden="true">
        <img src={stickers[name]} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" draggable="false" />
    </span>;
}
