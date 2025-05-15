import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div>
      My home page
      <Link href="/products">go to products</Link>
    </div>
  )
}


export default HomePage

