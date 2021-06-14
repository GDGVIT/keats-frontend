import React, { useState, useEffect, useCallback, useRef, useContext } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Document, Page, pdfjs } from 'react-pdf'
import { useSwipeable } from 'react-swipeable'
import { AppContext } from './../Context'
import Loader from './../components/Loader'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

interface Props {
  url: string
  setPdf: React.Dispatch<React.SetStateAction<boolean>>
  id: string
}

const Pdf: React.FC<Props> = ({ url, setPdf, id }) => {
  const [device, setDevice] = useState('')
  const [width, setWidth] = useState(0)
  const [pageInput, setPageInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { activeReaderState } = useContext(AppContext)
  const [activeReader, setActiveReader] = activeReaderState

  const checkDevice = (): string => {
    if (window.innerWidth < 768) return 'phone'
    else if (window.innerWidth < 1200) return 'tablet'
    else return 'desktop'
  }

  useEffect(() => {
    window.addEventListener('load', () => {
      setDevice(checkDevice())
      setWidth(window.innerWidth)
    })

    window.addEventListener('resize', () => {
      setDevice(checkDevice())
      setWidth(window.innerWidth)
      removeTextLayerOffset()
    })
  })

  useEffect(() => {
    setDevice(checkDevice())
    setWidth(window.innerWidth)
    return () => {
      setDevice(checkDevice())
      setWidth(window.innerWidth)
    }
  }, [])

  // PDF.js ka nakhra
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    if (activeReader.activeClub !== id) {
      setActiveReader({ activePage: 1, activeClub: id })
    }
  }, [activeReader.activeClub, id, setActiveReader])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages)
    if (activeReader.activeClub === id && activeReader.activePage <= numPages) {
      setPageNumber(activeReader.activePage)
    } else {
      setPageNumber(1)
      setActiveReader({ activePage: 1, activeClub: id })
    }
  }

  const onDocumentError = (): JSX.Element => {
    setPdf(false)
    return <div>Not a PDF</div>
  }

  const changePage = (offset: number): void => {
    setPageNumber(prevPageNumber => prevPageNumber + offset)
    setActiveReader({ activePage: activeReader.activePage + offset, activeClub: id })
  }

  const previousPage = useCallback(() => {
    if (pageNumber > 1) changePage(-1)
  }, [pageNumber])
  const nextPage = useCallback(() => {
    if (pageNumber < numPages) changePage(1)
  }, [pageNumber, numPages])

  const keyChangePage = useCallback((event) => {
    if (document.activeElement === inputRef.current && pageInput !== '') return
    if (event.keyCode === 37) previousPage()
    else if (event.keyCode === 39) nextPage()
  }, [nextPage, previousPage, pageInput])

  const handlePageInput = (e: React.BaseSyntheticEvent): void => {
    const re = /^[0-9]+$/
    if (e.target.value === '' || re.test(e.target.value)) setPageInput(e.target.value)
  }

  const changePageViaInput = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault()
    if (pageInput === '') return
    const skipPage = parseInt(pageInput)
    if (skipPage > 0 && skipPage <= numPages) {
      setPageNumber(skipPage)
      setActiveReader({ activePage: skipPage, activeClub: id })
      setPageInput('')
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyChangePage, false)

    return () => {
      document.removeEventListener('keydown', keyChangePage, false)
    }
  }, [keyChangePage])

  const removeTextLayerOffset = (): void => {
    const pageLayers = document.querySelectorAll('.react-pdf__Page')
    pageLayers.forEach(layer => {
      layer.setAttribute('style', 'position: relative; overflow: hidden;')
    })
    const textLayers = document.querySelectorAll('.react-pdf__Page__textContent')
    textLayers.forEach(layer => {
      layer.setAttribute('style', 'top: 0; left: 0; color: transparent; pointer-events: none;')
      // layer.setAttribute("style", "top:0; left:0; transform:\"\";")
      // const { style } = layer
      // style.top = "0"
      // style.left = "0"
      // style.transform = ""
    })
    const annotationLayers = document.querySelectorAll('.react-pdf__Page__annotations')
    annotationLayers.forEach(layer => {
      layer.setAttribute('style', 'display: none;')
    })
  }

  // Making swipey tings
  const handlers = useSwipeable({
    onSwipedLeft: () => nextPage(),
    onSwipedRight: () => previousPage(),
    preventDefaultTouchmoveEvent: true,
    delta: 15
  })

  return (
    <div className='read' {...handlers}>
      <div className='read-skip'>
        <form id='skip-page-form' onSubmit={changePageViaInput}>
          <input
            ref={inputRef}
            type='tel'
            id='page-input'
            value={pageInput}
            placeholder='Skip to page'
            autoComplete='off'
            onChange={handlePageInput}
          />
          <div className='page-input-submit' onClick={changePageViaInput}><FaArrowRight /></div>
        </form>
      </div>

      <div className='read-pageno'>
        <button
          className='read-pagenav'
          type='button'
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          {'<'}
        </button>
        <p>{pageNumber !== 0 ? pageNumber : (numPages !== 0 ? 1 : '--')} / {numPages !== 0 ? numPages : '--'}
        </p>
        <button
          className='read-pagenav'
          type='button'
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          {'>'}
        </button>
      </div>

      <div>
        <Document
          file={url}
          loading={<Loader />}
          onLoadSuccess={onDocumentLoadSuccess}
          error={onDocumentError}
        >
          <div className='read-book'>
            <Page
              pageNumber={pageNumber}
              width={
                device !== 'desktop'
                  ? (width * 0.9)
                  : (800)
              }
              onLoadSuccess={removeTextLayerOffset}
            />
          </div>
        </Document>
      </div>
    </div>
  )
}

export default Pdf
