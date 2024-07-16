import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchData } from './AsyncThunkFunctions/FetchData'
import { faCaretLeft, faCaretRight, faGrip, faList, faTableCellsLarge, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToggleViewReducer } from './Slices/ToggleViewSlice'
import { deletetodoreducer } from './Slices/FetchDataSlice'

const App = () => {

  const dispatch = useDispatch()
  const [currentpage, SetCurrentPage] = useState(1)
  const [itemsperpage, SetItemsPerPage] = useState(6)

  // Use useSelector to access the items in your state
  const view_toggle = useSelector((state) => state.toggle_view.view)
  const items = useSelector((state) => state?.productdata?.items);
  const isLoading = useSelector((state) => state?.productdata?.isLoading);
  const isError = useSelector((state) => state?.productdata?.isError);

  const totalPages = Math.ceil(items.length / itemsperpage);

  console.log(items);
  console.log(view_toggle);
  console.log(isLoading);

  useEffect(() => {
    dispatch(FetchData())
  }, [])



  if (isLoading) {
    return <div className='min-h-screen w-full flex justify-center items-center text-3xl'>Loading...</div>
  }
  if (isError) {
    return <div className='min-h-screen w-full flex justify-center items-center text-3xl'>{isError}</div>
  }

  const lastindex = currentpage * itemsperpage
  const firstIndex = lastindex - itemsperpage

  console.log("First", firstIndex, "Last", lastindex);


  const HandlePageClicked = (pageclicked) => SetCurrentPage(pageclicked)
  const HandlePrev = () => (currentpage === 1) ? SetCurrentPage(totalPages) : SetCurrentPage(currentpage - 1)
  const HandleNext = () => (currentpage >= totalPages) ? SetCurrentPage(1) : SetCurrentPage(currentpage + 1)


  return (
    <>
      <div className='min-h-screen w-full p-3 md:p-10 overflow-x-auto'>
        <div className='w-full flex justify-end items-center space-x-3'>
          <button onClick={() => dispatch(ToggleViewReducer())} className='bg-black text-white py-2 px-4 rounded-lg font-semibold'>Toggle View: </button>
          <p className='flex items-center space-x-3'>- {view_toggle === 'List View' ? <FontAwesomeIcon className='text-2xl mx-2' icon={faList} /> : <FontAwesomeIcon className='text-3xl mx-2' icon={faGrip} />} {view_toggle}</p>
        </div>
        <div className={`p-10 grid ${view_toggle === 'Card View' ? 'grid-cols-3' : 'grid-cols-1'}  gap-5`}>
          {
            items.slice(firstIndex, lastindex).map((item) => {
              return (
                <>
                  <div className='border border-red-500 p-7 bg-black text-white' key={item.id}>
                    <div className='flex justify-end py-2'>
                      <button onClick={() => dispatch(deletetodoreducer(item.id))}><FontAwesomeIcon className='font-bold text-xl hover:text-2xl transition-all ease-linear duration-300' icon={faX} /></button>
                    </div>
                    <p> {item.id}. <span>{item.title}</span></p>
                  </div>
                </>
              )
            })
          }

        </div>
        <div className='w-full flex justify-center items-center py-5 overflow-x-auto'>
          <button onClick={HandlePrev}><FontAwesomeIcon className='text-5xl' icon={faCaretLeft} /></button>
          {
            new Array(totalPages).fill('').map((_, i) => {
              return (
                <>

                  <span key={i + 1} onClick={() => HandlePageClicked(i + 1)} className={`border ${currentpage === i + 1 ? 'bg-black text-white' : 'bg-white text-black'} border-black py-2 px-4 hover:bg-black hover:text-white cursor-pointer`}>{i + 1}</span>
                </>
              )
            })

          }
          <button onClick={HandleNext}><FontAwesomeIcon className='text-5xl' icon={faCaretRight} /></button>
        </div>
      </div>
    </>
  )
}

export default App
