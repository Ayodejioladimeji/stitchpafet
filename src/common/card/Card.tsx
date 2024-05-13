import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";


const Card = ({ item }) => {
  const [favorite, setFavorite] = useState(false);
  const router = useRouter()

  return (
    <div className="card" onClick={() => router.push(`/products/${item.id}`)}>
      <div className="product-image">
        <Image src={item.image} alt="" width={100} height={100} unoptimized />
      </div>

      <div className="product-body">
        <p>{item.title}</p>
        <small>₦{item.price}</small>
        <span
        ><svg
          width="120"
          height="20"
          viewBox="0 0 120 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
            <g opacity="0.5">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.595 2.86736L12.525 6.74986C12.6217 6.94569 12.8084 7.08236 13.025 7.11403L17.3459 7.73819C17.5209 7.76153 17.6784 7.85319 17.7859 7.99319C17.9875 8.25569 17.9567 8.62736 17.715 8.85319L14.5834 11.8815C14.4242 12.0315 14.3534 12.2515 14.395 12.4657L15.145 16.739C15.1975 17.0932 14.9559 17.4249 14.6017 17.4824C14.455 17.5049 14.305 17.4815 14.1717 17.4157L10.3234 15.3982C10.13 15.2932 9.89836 15.2932 9.70503 15.3982L5.82836 17.4265C5.50419 17.5915 5.10753 17.469 4.93086 17.1515C4.86336 17.0232 4.84003 16.8774 4.86336 16.7349L5.61336 12.4615C5.65086 12.2482 5.58003 12.029 5.42503 11.8782L2.27669 8.85069C2.02003 8.59569 2.01836 8.18069 2.27419 7.92403C2.27503 7.92319 2.27586 7.92153 2.27669 7.92069C2.38253 7.82486 2.51253 7.76069 2.65336 7.73569L6.97503 7.11153C7.19086 7.07736 7.37669 6.94236 7.47503 6.74653L9.40336 2.86736C9.48086 2.70986 9.61836 2.58903 9.78503 2.53403C9.95253 2.47819 10.1359 2.49153 10.2934 2.57069C10.4225 2.63486 10.5284 2.73903 10.595 2.86736Z"
                fill="#FFB82E"
                stroke="#FFB82E"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <g opacity="0.5">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M35.595 2.86736L37.525 6.74986C37.6217 6.94569 37.8084 7.08236 38.025 7.11403L42.3459 7.73819C42.5209 7.76153 42.6784 7.85319 42.7859 7.99319C42.9875 8.25569 42.9567 8.62736 42.715 8.85319L39.5834 11.8815C39.4242 12.0315 39.3534 12.2515 39.395 12.4657L40.145 16.739C40.1975 17.0932 39.9559 17.4249 39.6017 17.4824C39.455 17.5049 39.305 17.4815 39.1717 17.4157L35.3234 15.3982C35.13 15.2932 34.8984 15.2932 34.705 15.3982L30.8284 17.4265C30.5042 17.5915 30.1075 17.469 29.9309 17.1515C29.8634 17.0232 29.84 16.8774 29.8634 16.7349L30.6134 12.4615C30.6509 12.2482 30.58 12.029 30.425 11.8782L27.2767 8.85069C27.02 8.59569 27.0184 8.18069 27.2742 7.92403C27.275 7.92319 27.2759 7.92153 27.2767 7.92069C27.3825 7.82486 27.5125 7.76069 27.6534 7.73569L31.975 7.11153C32.1909 7.07736 32.3767 6.94236 32.475 6.74653L34.4034 2.86736C34.4809 2.70986 34.6184 2.58903 34.785 2.53403C34.9525 2.47819 35.1359 2.49153 35.2934 2.57069C35.4225 2.63486 35.5284 2.73903 35.595 2.86736Z"
                fill="#FFB82E"
                stroke="#FFB82E"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <g opacity="0.5">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M60.595 2.86736L62.525 6.74986C62.6217 6.94569 62.8084 7.08236 63.025 7.11403L67.3459 7.73819C67.5209 7.76153 67.6784 7.85319 67.7859 7.99319C67.9875 8.25569 67.9567 8.62736 67.715 8.85319L64.5834 11.8815C64.4242 12.0315 64.3534 12.2515 64.395 12.4657L65.145 16.739C65.1975 17.0932 64.9559 17.4249 64.6017 17.4824C64.455 17.5049 64.305 17.4815 64.1717 17.4157L60.3234 15.3982C60.13 15.2932 59.8984 15.2932 59.705 15.3982L55.8284 17.4265C55.5042 17.5915 55.1075 17.469 54.9309 17.1515C54.8634 17.0232 54.84 16.8774 54.8634 16.7349L55.6134 12.4615C55.6509 12.2482 55.58 12.029 55.425 11.8782L52.2767 8.85069C52.02 8.59569 52.0184 8.18069 52.2742 7.92403C52.275 7.92319 52.2759 7.92153 52.2767 7.92069C52.3825 7.82486 52.5125 7.76069 52.6534 7.73569L56.975 7.11153C57.1909 7.07736 57.3767 6.94236 57.475 6.74653L59.4034 2.86736C59.4809 2.70986 59.6184 2.58903 59.785 2.53403C59.9525 2.47819 60.1359 2.49153 60.2934 2.57069C60.4225 2.63486 60.5284 2.73903 60.595 2.86736Z"
                fill="#FFB82E"
                stroke="#FFB82E"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <g opacity="0.5">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M85.595 2.86736L87.525 6.74986C87.6217 6.94569 87.8084 7.08236 88.025 7.11403L92.3459 7.73819C92.5209 7.76153 92.6784 7.85319 92.7859 7.99319C92.9875 8.25569 92.9567 8.62736 92.715 8.85319L89.5834 11.8815C89.4242 12.0315 89.3534 12.2515 89.395 12.4657L90.145 16.739C90.1975 17.0932 89.9559 17.4249 89.6017 17.4824C89.455 17.5049 89.305 17.4815 89.1717 17.4157L85.3234 15.3982C85.13 15.2932 84.8984 15.2932 84.705 15.3982L80.8284 17.4265C80.5042 17.5915 80.1075 17.469 79.9309 17.1515C79.8634 17.0232 79.84 16.8774 79.8634 16.7349L80.6134 12.4615C80.6509 12.2482 80.58 12.029 80.425 11.8782L77.2767 8.85069C77.02 8.59569 77.0184 8.18069 77.2742 7.92403C77.275 7.92319 77.2759 7.92153 77.2767 7.92069C77.3825 7.82486 77.5125 7.76069 77.6534 7.73569L81.975 7.11153C82.1909 7.07736 82.3767 6.94236 82.475 6.74653L84.4034 2.86736C84.4809 2.70986 84.6184 2.58903 84.785 2.53403C84.9525 2.47819 85.1359 2.49153 85.2934 2.57069C85.4225 2.63486 85.5284 2.73903 85.595 2.86736Z"
                fill="#FFB82E"
                stroke="#FFB82E"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <g opacity="0.5">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M110.595 2.86736L112.525 6.74986C112.622 6.94569 112.808 7.08236 113.025 7.11403L117.346 7.73819C117.521 7.76153 117.678 7.85319 117.786 7.99319C117.988 8.25569 117.957 8.62736 117.715 8.85319L114.583 11.8815C114.424 12.0315 114.353 12.2515 114.395 12.4657L115.145 16.739C115.198 17.0932 114.956 17.4249 114.602 17.4824C114.455 17.5049 114.305 17.4815 114.172 17.4157L110.323 15.3982C110.13 15.2932 109.898 15.2932 109.705 15.3982L105.828 17.4265C105.504 17.5915 105.108 17.469 104.931 17.1515C104.863 17.0232 104.84 16.8774 104.863 16.7349L105.613 12.4615C105.651 12.2482 105.58 12.029 105.425 11.8782L102.277 8.85069C102.02 8.59569 102.018 8.18069 102.274 7.92403C102.275 7.92319 102.276 7.92153 102.277 7.92069C102.383 7.82486 102.513 7.76069 102.653 7.73569L106.975 7.11153C107.191 7.07736 107.377 6.94236 107.475 6.74653L109.403 2.86736C109.481 2.70986 109.618 2.58903 109.785 2.53403C109.953 2.47819 110.136 2.49153 110.293 2.57069C110.423 2.63486 110.528 2.73903 110.595 2.86736Z"
                stroke="#FFB82E"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g></svg
          ></span>
      </div>

      <div className="card-footer">
        <button>Add to cart</button>
        <button>Buy now</button>
      </div>
    </div>
  );
};

export default Card;
