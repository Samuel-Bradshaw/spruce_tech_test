import React, { useState } from 'react'
import { XorO } from './types'
import { Board } from './board/Board'

export const Main = () => {

  return <div className='flex flex-col mt-10 items-center gap-10'>
    <div className='font-bold text-2xl'>Tic Tac Toe</div>
		<Board />
  </div>
}
