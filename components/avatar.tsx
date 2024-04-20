"use client";

import React from "react";

interface Props {
  name: string;
  imageUrl: string;
}

const Avatar = ({ name, imageUrl }: Props) => {
  return (
    <div>
      <img src={imageUrl} alt={name} />
    </div>
  );
};

export default Avatar;
