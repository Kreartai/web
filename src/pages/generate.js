import Generate from "@/components/Generate/Generate"
import ShowImages from "@/components/ShowImages/ShowImages"

import React from 'react'

function generate() {

  return (
    <div className="text-white">
      
      <div className="py-20">
      
        <Generate />
        <ShowImages />
      </div>
    </div>
  )
}

export default generate