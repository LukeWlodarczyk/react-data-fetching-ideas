export default [
  {
    "name": "api",
    "nodes": [
      {
        "name": "books.js",
        "content": "import axios from 'axios';\n\nimport { BASE_URL } from './constants';\n\nconst getBooksByTitleApiUrl = ({ title, limit }) =>\n  `${BASE_URL}/search.json?title=${title}&limit=${limit}`;\n\nconst request = ({ title }, { signal }) =>\n  axios(getBooksByTitleApiUrl({ title, limit: 3 }), { signal });\n\nconst fetchWithReject = async () =>\n  new Promise((res, rej) => setTimeout(() => rej({}), 200));\n\nlet attemptCounter = 0;\n\nexport const fetchBooksByTitle = async (title, { signal } = {}) => {\n  attemptCounter++;\n  console.log('fetch attempt', attemptCounter, title);\n\n  if (Math.random() > 0.5) {\n    console.log('fetch failed', attemptCounter);\n    await fetchWithReject();\n    return;\n  }\n\n  const res = await request({ title }, { signal });\n\n  return res.data.docs;\n};\n",
        "path": "src/api/books.js"
      },
      {
        "name": "cache.js",
        "content": "const cacheMap = new Map();\n\nconst cache = (fetcher, key) => {\n  const cached = cacheMap.get(key);\n\n  if (cached && !cached.isRejected) {\n    return cached;\n  }\n\n  const promise = fetcher()\n    .then((data) => {\n      promise.isResolved = true;\n      return data;\n    })\n    .catch((e) => {\n      promise.isRejected = true;\n      throw e;\n    });\n\n  cacheMap.set(key, promise);\n\n  return promise;\n};\n\nexport default cache;\n",
        "path": "src/api/cache.js"
      },
      {
        "name": "constants.js",
        "content": "export const BASE_URL = 'https://openlibrary.org';\n",
        "path": "src/api/constants.js"
      },
      {
        "name": "memoize.js",
        "content": "const memoize = (fetcher, resolver = (...args) => args[0]) => {\n  const cacheMap = new Map();\n\n  const memoized = (...args) => {\n    const key = resolver(...args);\n\n    const cached = cacheMap.get(key);\n\n    if (cached) return cached;\n\n    const promise = fetcher(...args)\n      .then((data) => {\n        promise.isResolved = true;\n        return data;\n      })\n      .catch((e) => {\n        cacheMap.delete(key);\n        throw e;\n      });\n\n    cacheMap.set(key, promise);\n\n    return promise;\n  };\n\n  const cleanup = (key) => {\n    const cached = cacheMap.get(key);\n\n    if (!cached?.isResolved) cacheMap.delete(key);\n  };\n\n  memoized.cleanup = cleanup;\n\n  return memoized;\n};\n\nexport default memoize;\n",
        "path": "src/api/memoize.js"
      }
    ],
    "path": "api"
  },
  {
    "name": "books",
    "nodes": [
      {
        "name": "BooksResourceSuspene",
        "nodes": [
          {
            "name": "BooksResourceSuspene.js",
            "content": "import React, { Suspense } from 'react';\nimport { ErrorBoundary } from 'react-error-boundary';\n\nimport Page from '@/ui/Page';\nimport BooksListStates from '@/ui/BooksListStates';\nimport { BasicInput } from '@/ui/SearchInput';\n\nimport useInputWithDebouncedParam from '@/hooks/useInputWithDebouncedParam';\nimport { fetchBooksByTitle } from '@/api/books';\nimport memoize from '@/api/memoize';\n\nimport SuspendableResource from './SuspendableResource';\n\nimport createResource from './resource';\n\nconst booksResource = createResource(memoize(fetchBooksByTitle));\n\nconst Books = () => {\n  const { input, param } = useInputWithDebouncedParam({\n    paramName: 'title',\n    debounce: 400,\n  });\n\n  return (\n    <Page>\n      <BasicInput\n        autoFocus\n        name=\"title\"\n        placeholder=\"book title...\"\n        value={input.value}\n        onChange={input.onChange}\n      />\n      <ErrorBoundary\n        FallbackComponent={({ resetErrorBoundary }) => (\n          <BooksListStates.Error onRetry={resetErrorBoundary} />\n        )}\n        resetKeys={[param.value]}\n        onReset={booksResource.reset}\n      >\n        <Suspense fallback={<BooksListStates.Loading />}>\n          <SuspendableResource\n            resource={booksResource}\n            query={param.value}\n            isDisabled={!param.hasValue}\n          >\n            {({ data, isDisabled }) => (\n              <>\n                {data?.length > 0 && <BooksListStates.Success books={data} />}\n                {data?.length === 0 && <BooksListStates.Empty />}\n                {isDisabled && <BooksListStates.EmptyTitle />}\n              </>\n            )}\n          </SuspendableResource>\n        </Suspense>\n      </ErrorBoundary>\n    </Page>\n  );\n};\n\nexport default Books;\n",
            "path": "src/books/BooksResourceSuspene/BooksResourceSuspene.js"
          },
          {
            "name": "SuspendableResource.js",
            "content": "const SuspendableResource = ({ children, resource, query, isDisabled }) => {\n  let data;\n\n  if (!isDisabled) data = resource.read(query);\n\n  return children({ data, isDisabled });\n};\n\nexport default SuspendableResource;\n",
            "path": "src/books/BooksResourceSuspene/SuspendableResource.js"
          },
          {
            "name": "index.js",
            "content": "export { default } from './BooksResourceSuspene';\n",
            "path": "src/books/BooksResourceSuspene/index.js"
          },
          {
            "name": "resource.js",
            "content": "const createResource = (fetcher) => {\n  let prevQuery;\n  let status = 'pending';\n  let response;\n  let suspender;\n\n  const createSuspender = (query) =>\n    fetcher(query).then(\n      (res) => {\n        status = 'success';\n        response = res;\n      },\n      (err) => {\n        status = 'error';\n        response = err;\n      }\n    );\n\n  const reset = () => {\n    prevQuery = undefined;\n    status = 'pending';\n    response = undefined;\n    suspender = undefined;\n  };\n\n  const read = (query) => {\n    if (!suspender || prevQuery !== query) {\n      prevQuery = query;\n      status = 'pending';\n      suspender = createSuspender(query);\n    }\n\n    switch (status) {\n      case 'pending':\n        throw suspender;\n      case 'error':\n        throw response;\n      default:\n        return response;\n    }\n  };\n\n  return { read, reset };\n};\n\nexport default createResource;\n",
            "path": "src/books/BooksResourceSuspene/resource.js"
          }
        ],
        "path": "src/books/BooksResourceSuspene"
      },
      {
        "name": "BooksStandard",
        "nodes": [
          {
            "name": "BooksStandard.js",
            "content": "import Page from '@/ui/Page';\nimport SearchInput from '@/ui/SearchInput';\nimport BooksListStates from '@/ui/BooksListStates';\n\nimport useBooks from './useBooks';\n\nconst Books = () => {\n  const {\n    books,\n    isLoading,\n    isSuccess,\n    isEmptySuccess,\n    isEmptyTitle,\n    isApiError,\n    input,\n    refetch,\n  } = useBooks();\n\n  return (\n    <Page>\n      <SearchInput\n        autoFocus\n        name=\"title\"\n        placeholder=\"book title...\"\n        value={input.value}\n        onChange={input.onChange}\n        isLoading={isLoading}\n        isSuccess={isSuccess}\n        isEmpty={isEmptyTitle}\n        isEmptySuccess={isEmptySuccess}\n        isError={isApiError}\n      />\n      {isSuccess && <BooksListStates.Success books={books} />}\n      {isLoading && <BooksListStates.Loading />}\n      {isEmptySuccess && <BooksListStates.Empty />}\n      {isApiError && <BooksListStates.Error onRetry={refetch} />}\n      {isEmptyTitle && <BooksListStates.EmptyTitle />}\n    </Page>\n  );\n};\n\nexport default Books;\n",
            "path": "src/books/BooksStandard/BooksStandard.js"
          },
          {
            "name": "list",
            "nodes": [
              {
                "name": "BooksList.js",
                "content": "import { useState, useCallback, useMemo, memo, useEffect } from 'react';\n\nimport BookSvg from './book.svg';\n\nconst BookCoverImg = memo(({ coverId }) => {\n  const [isLoaded, setIsLoaded] = useState(false);\n\n  const handleOnLoad = () => setIsLoaded(true);\n\n  const sizeStyle = { width: '100px', height: '140px' };\n\n  const opacityStyle = isLoaded ? { opacity: 1 } : { opacity: 0 };\n\n  return (\n    <div style={{ background: '#333', ...sizeStyle, borderRadius: '8px' }}>\n      <img\n        loading=\"lazy\"\n        onLoad={handleOnLoad}\n        src={`https://covers.openlibrary.org/b/id/${coverId}-M.jpg?default=false`}\n        style={{\n          ...{ transition: 'opacity .6s', borderRadius: '8px' },\n          ...opacityStyle,\n          ...sizeStyle,\n        }}\n      />\n    </div>\n  );\n});\n\nconst BookCard = ({ book }) => (\n  <div\n    style={{\n      width: '366px',\n      border: '1px solid #45474B',\n      borderRadius: '4px',\n      padding: '14px',\n      display: 'flex',\n    }}\n  >\n    {book.cover_i && <BookCoverImg coverId={book.cover_i} />}\n    <h4 style={{ margin: '0', marginLeft: '24px' }}>{book.title}</h4>\n  </div>\n);\n\nconst BooksList = ({ books }) => {\n  return (\n    <ul style={{ display: 'flex', flexDirection: 'column' }}>\n      {books.map((book) => (\n        <li\n          key={book.key}\n          style={{ margin: '8px', display: 'flex', justifyContent: 'center' }}\n        >\n          <BookCard book={book} />\n        </li>\n      ))}\n    </ul>\n  );\n};\n\nexport default BooksList;\n",
                "path": "src/books/BooksStandard/list/BooksList.js"
              },
              {
                "name": "BooksList1.js",
                "content": "import { useState, useCallback, useMemo, memo } from 'react';\n\nimport BookSvg from './book.svg';\n\nconst BookCoverImg = memo(({ isbn, isVisible, onBrokenImg }) => {\n  const [isLoaded, setIsLoaded] = useState(false);\n  const [isError, setIsError] = useState(false);\n\n  const handleOnLoad = (e) => {\n    if (e.target.width > 1) setIsLoaded(true);\n    else onBrokenImg(isbn);\n  };\n\n  const handleOnError = () => {\n    setIsError(true);\n    onBrokenImg(isbn);\n  };\n\n  const sizeStyle = isLoaded ? { width: '150px', height: '200px' } : {};\n\n  const opacityStyle = isLoaded && isVisible ? { opacity: 1 } : { opacity: 0 };\n\n  const src = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg?default=false`;\n\n  return (\n    <img\n      loading=\"lazy\"\n      src={src}\n      onLoad={handleOnLoad}\n      onError={handleOnError}\n      style={{\n        ...{ transition: 'opacity .6s', position: 'absolute', left: 0, top: 0 },\n        ...opacityStyle,\n        ...sizeStyle,\n      }}\n    />\n  );\n});\n\nconst BookCoverImgSlider = ({ isbns }) => {\n  const [current, setCurrent] = useState(0);\n  const [broken, setBroken] = useState([]);\n\n  const validIsbns = useMemo(\n    () => isbns.filter((isbn) => !broken.includes(isbn)),\n    [broken]\n  );\n\n  const handleImgClick = useCallback(() => {\n    setCurrent((current) => {\n      if (current === validIsbns.length - 1) return 0;\n      else return current + 1;\n    });\n  }, [validIsbns]);\n\n  const handleBrokenImg = useCallback(\n    (isbn) => setBroken((broken) => [...broken, isbn]),\n    []\n  );\n\n  return (\n    <div\n      style={{\n        width: '150px',\n        height: '200px',\n        position: 'relative',\n        border: '1px solid black',\n      }}\n      onClick={handleImgClick}\n    >\n      {validIsbns.map((isbn) => (\n        <BookCoverImg\n          key={isbn}\n          onClick={handleImgClick}\n          isVisible={validIsbns[current] === isbn}\n          isbn={isbn}\n          onBrokenImg={handleBrokenImg}\n        />\n      ))}\n    </div>\n  );\n};\n\nconst BooksList = ({ books }) => {\n  return (\n    <ul>\n      {books.map((book) => (\n        <li key={book.key} style={{ margin: '30px' }}>\n          {book.isbn && <BookCoverImgSlider isbns={book.isbn.slice(0, 100)} />}\n          {book.title}\n        </li>\n      ))}\n    </ul>\n  );\n};\n\nexport default BooksList;\n",
                "path": "src/books/BooksStandard/list/BooksList1.js"
              },
              {
                "name": "BooksList3.js",
                "content": "import { useState, useCallback, useMemo, memo, useEffect } from 'react';\n\nimport BookSvg from './book.svg';\n\nconst BookCoverImg = memo(({ src, isVisible }) => {\n  const sizeStyle = { width: '150px', height: '200px' };\n\n  const opacityStyle = isVisible ? { opacity: 1 } : { opacity: 0 };\n\n  console.log(src, isVisible);\n\n  return (\n    <img\n      loading=\"lazy\"\n      src={src}\n      style={{\n        ...{ transition: 'opacity .6s', position: 'absolute', left: 0, top: 0 },\n        ...opacityStyle,\n        ...sizeStyle,\n      }}\n    />\n  );\n});\n\nfunction loadImage(url) {\n  return new Promise((resolve, reject) => {\n    const image = new Image();\n\n    image.onload = () => resolve(image);\n    image.src = url;\n  });\n}\n\nconst BookCoverImgSlider = ({ isbns }) => {\n  const [current, setCurrent] = useState(0);\n  const [imgs, setImgs] = useState([]);\n\n  const handleImgClick = useCallback(() => {\n    setCurrent((current) => {\n      if (current >= imgs.length - 1) return 0;\n      else return current + 1;\n    });\n  }, [imgs]);\n\n  useEffect(() => {\n    let ignore = false;\n    isbns.map((isbn) =>\n      loadImage(\n        `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg?default=false`\n      ).then((img) => {\n        if (ignore) return;\n        setImgs((imgs) => [...imgs, img]);\n      })\n    );\n\n    return () => {\n      ignore = true;\n    };\n  }, []);\n\n  return (\n    <div\n      style={{\n        width: '150px',\n        height: '200px',\n        position: 'relative',\n        border: '1px solid black',\n      }}\n      onClick={handleImgClick}\n    >\n      {imgs.map((img) => (\n        <BookCoverImg\n          key={img.src}\n          src={img.src}\n          isVisible={imgs[current].src === img.src}\n        />\n      ))}\n    </div>\n  );\n};\n\nconst BooksList = ({ books }) => {\n  return (\n    <ul>\n      {books.map((book) => (\n        <li key={book.key} style={{ margin: '30px' }}>\n          {book.isbn && <BookCoverImgSlider isbns={book.isbn.slice(0, 100)} />}\n          {book.title}\n        </li>\n      ))}\n    </ul>\n  );\n};\n\nexport default BooksList;\n",
                "path": "src/books/BooksStandard/list/BooksList3.js"
              }
            ],
            "path": "src/books/BooksStandard/list"
          },
          {
            "name": "reducer.js",
            "content": "export const REQUEST_STATUS = {\n  IDLE: 'IDLE',\n  LOADING: 'LOADING',\n  SUCCESS: 'SUCCESS',\n  ERROR: 'ERROR',\n};\n\nexport const ACTIONS = {\n  RESET: 'RESET',\n  INIT: 'INIT',\n  RESOLVE: 'RESOLVE',\n  REJECT: 'REJECT',\n};\n\nexport const initialState = {\n  data: null,\n  error: null,\n  status: REQUEST_STATUS.IDLE,\n};\n\nexport const reducer = (state = initialState, action) => {\n  switch (action.type) {\n    case ACTIONS.RESET:\n      return { ...initialState };\n    case ACTIONS.INIT:\n      return { ...initialState, status: REQUEST_STATUS.LOADING };\n    case ACTIONS.RESOLVE:\n      return {\n        data: action.payload,\n        error: null,\n        status: REQUEST_STATUS.SUCCESS,\n      };\n    case ACTIONS.REJECT:\n      return {\n        data: null,\n        error: action.payload,\n        status: REQUEST_STATUS.ERROR,\n      };\n    default:\n      state;\n  }\n};\n",
            "path": "src/books/BooksStandard/reducer.js"
          },
          {
            "name": "useBooks.js",
            "content": "import useInputWithDebouncedParam from '@/hooks/useInputWithDebouncedParam';\n\nimport useBooksApi from './useBooksApi';\n\nconst useBooks = () => {\n  const { input, param } = useInputWithDebouncedParam({ paramName: 'title' });\n\n  const { data, isLoading, isSuccess, error, refetch } = useBooksApi(\n    param.value,\n    {\n      enable: param.hasValue,\n    }\n  );\n\n  const isApiError = Boolean(error);\n  const hasBooks = Boolean(data?.length);\n\n  return {\n    books: data,\n    isLoading,\n    isSuccess: isSuccess && hasBooks,\n    isEmptySuccess: isSuccess && !hasBooks,\n    isEmptyTitle: !param.hasValue,\n    isApiError,\n    input,\n    refetch: () => refetch(param.value),\n  };\n};\n\nexport default useBooks;\n",
            "path": "src/books/BooksStandard/useBooks.js"
          },
          {
            "name": "useBooksApi.js",
            "content": "import { useEffect, useReducer } from 'react';\n\nimport { fetchBooksByTitle } from '@/api/books';\n\nimport { reducer, initialState, ACTIONS, REQUEST_STATUS } from './reducer';\n\nconst useBooksApi = (title, { enable }) => {\n  const [state, dispatch] = useReducer(reducer, initialState);\n\n  const getBooksByTitle = async (\n    title,\n    { ac = new AbortController() } = {}\n  ) => {\n    dispatch({ type: ACTIONS.INIT });\n\n    try {\n      const data = await fetchBooksByTitle(title, {\n        signal: ac.signal,\n      });\n\n      dispatch({ type: ACTIONS.RESOLVE, payload: data });\n    } catch (error) {\n      if (!ac.signal.aborted)\n        dispatch({ type: ACTIONS.REJECT, payload: error });\n    }\n  };\n\n  useEffect(() => {\n    const ac = new AbortController();\n\n    if (enable) getBooksByTitle(title, { ac });\n    else dispatch({ type: ACTIONS.RESET });\n\n    return () => ac.abort();\n  }, [title, enable]);\n\n  const { data, error, status } = state;\n\n  return {\n    data,\n    isLoading: status === REQUEST_STATUS.LOADING,\n    isSuccess: status === REQUEST_STATUS.SUCCESS,\n    error,\n    refetch: getBooksByTitle,\n  };\n};\n\nexport default useBooksApi;\n",
            "path": "src/books/BooksStandard/useBooksApi.js"
          },
          {
            "name": "useBooksApi2.js",
            "content": "import { useState, useEffect } from 'react';\n\nimport { fetchBooksByTitle } from '@/api/books';\n\nimport memoize from '@/api/memoize';\n\nconst mFetchBooksByTitle = memoize(fetchBooksByTitle);\n\nconst LOADING_STATE = {\n  IDLE: 'IDLE',\n  LOADING: 'LOADING',\n  DONE: 'DONE',\n  ERROR: 'ERROR',\n};\n\nconst useBooksApi = (title, { enable }) => {\n  const [books, setBooks] = useState([]);\n  const [loadingState, setLoadingState] = useState(LOADING_STATE.IDLE);\n  const [error, setError] = useState(null);\n\n  const setInitialState = () => {\n    setBooks([]);\n    setLoadingState(LOADING_STATE.IDLE);\n    setError(null);\n  };\n\n  const getBooksByTitle = async (\n    title,\n    { ac = new AbortController() } = {}\n  ) => {\n    setInitialState();\n    setLoadingState(LOADING_STATE.LOADING);\n\n    try {\n      const books = await mFetchBooksByTitle(title, {\n        signal: ac.signal,\n      });\n      setBooks(books);\n    } catch (error) {\n      if (!ac.signal.aborted) setError(error);\n    } finally {\n      if (!ac.signal.aborted) setLoadingState(LOADING_STATE.DONE);\n    }\n  };\n\n  useEffect(() => {\n    const ac = new AbortController();\n\n    if (enable) getBooksByTitle(title, { ac });\n    else setInitialState();\n\n    return () => {\n      ac.abort();\n      mFetchBooksByTitle.cleanup(title);\n    };\n  }, [title, enable]);\n\n  return {\n    books,\n    isLoading: loadingState === LOADING_STATE.LOADING,\n    isDone: loadingState === LOADING_STATE.DONE,\n    error,\n    refetch: getBooksByTitle,\n  };\n};\n\nexport default useBooksApi;\n",
            "path": "src/books/BooksStandard/useBooksApi2.js"
          }
        ],
        "path": "src/books/BooksStandard"
      },
      {
        "name": "BooksStandard2",
        "nodes": [
          {
            "name": "BooksStandard.js",
            "content": "import Page from '@/ui/Page';\nimport BooksListStates from '@/ui/BooksListStates';\nimport SearchInput from '@/ui/SearchInput';\n\nimport useBooks from './useBooks';\n\nconst Books = () => {\n  const {\n    books,\n    isLoading,\n    isSuccess,\n    isEmptyTitle,\n    isApiError,\n    isNoBooksError,\n    title,\n    onChangeTitle,\n  } = useBooks();\n\n  return (\n    <Page>\n      <SearchInput\n        autoFocus\n        name=\"title\"\n        placeholder=\"book title...\"\n        value={title}\n        onChange={onChangeTitle}\n        isLoading={isLoading}\n        isSuccess={isSuccess}\n        isEmpty={isEmptyTitle}\n        isEmptySuccess={isNoBooksError}\n        isError={isApiError}\n      />\n      {isSuccess && <BooksListStates.Success books={books} />}\n      {isLoading && <BooksListStates.Loading />}\n      {isNoBooksError && <BooksListStates.Empty />}\n      {isApiError && <BooksListStates.Error />}\n      {isEmptyTitle && <BooksListStates.EmptyTitle />}\n    </Page>\n  );\n};\n\nexport default Books;\n",
            "path": "src/books/BooksStandard2/BooksStandard.js"
          },
          {
            "name": "useAbortController.js",
            "content": "import { useRef } from 'react';\n\nlet id = 0;\nconst genId = () => {\n  return id++;\n};\n\nconst useAbortController = () => {\n  const abortControllers = useRef([]);\n\n  const add = (ac) => {\n    ac.id = genId();\n    abortControllers.current = [ac, ...abortControllers.current];\n  };\n\n  const isAborted = (ac) => ac.signal.aborted;\n\n  const abort = (ac) => !isAborted(ac) && ac.abort();\n\n  const abortAll = () =>\n    abortControllers.current.forEach((ac) => !isAborted(ac) && abort(ac));\n\n  const removeAll = () => (abortControllers.current = []);\n\n  const cleanUp = () => {\n    abortAll();\n    removeAll();\n  };\n\n  const log = (fn) => (arg) => {\n    // console.log('before', fn.name, abortControllers.current);\n    const result = fn(arg);\n    // console.log('after', fn.name, abortControllers.current, { result });\n    return result;\n  };\n\n  return {\n    add: log(add),\n    isAborted: log(isAborted),\n    abort: log(abort),\n    abortAll: log(abortAll),\n    cleanUp: log(cleanUp),\n  };\n};\n\nexport default useAbortController;\n",
            "path": "src/books/BooksStandard2/useAbortController.js"
          },
          {
            "name": "useBooks.js",
            "content": "import { useState } from 'react';\nimport _debounce from 'lodash/debounce';\n\nimport useBooksApi from './useBooksApi';\n\nconst useBooks = () => {\n  const [title, setTitle] = useState('');\n\n  const { books, isLoading, error, refetch } = useBooksApi(title);\n\n  const onChangeTitle = (e) => {\n    const { value } = e.target;\n\n    setTitle(value);\n    refetch(value, { debounce: 400, abortParallel: true });\n  };\n\n  const isApiError = Boolean(error);\n  const hasTitle = Boolean(title.trim());\n  const hasBooks = Boolean(books.length);\n\n  return {\n    books,\n    isLoading,\n    isSuccess: !isLoading && !isApiError && hasBooks,\n    isEmptyTitle: !hasTitle,\n    isApiError,\n    isNoBooksError: !isLoading && !isApiError && !hasBooks && hasTitle,\n    title,\n    onChangeTitle,\n  };\n};\n\nexport default useBooks;\n",
            "path": "src/books/BooksStandard2/useBooks.js"
          },
          {
            "name": "useBooksApi.js",
            "content": "import { useState, useEffect, useCallback } from 'react';\n\nimport { fetchBooksByTitle } from '@/api/books';\nimport useAbortController from './useAbortController';\n\nfunction _debounce(f, defaultTime = 0) {\n  let timer = null;\n  let time = defaultTime;\n\n  const debounced = (...args) => {\n    if (time === 0) return f(...args);\n\n    return new Promise((resolve) => {\n      clearTimeout(timer);\n      timer = setTimeout(() => resolve(f(...args)), time);\n    });\n  };\n\n  debounced.cancel = () => {\n    clearTimeout(timer);\n  };\n\n  debounced.setTime = (msec) => {\n    time = msec;\n    return debounced;\n  };\n\n  return debounced;\n}\n\nconst debouncedFetchBooksByTitle = _debounce(fetchBooksByTitle);\n\nconst useBooksApi = (title) => {\n  const [books, setBooks] = useState([]);\n  const [isLoading, setIsLoading] = useState(false);\n  const [error, setError] = useState(null);\n\n  const abortController = useAbortController();\n\n  const setInitialState = () => {\n    setError(null);\n    setBooks([]);\n    setIsLoading(false);\n  };\n\n  const getBooksByTitle = useCallback(\n    async (\n      title,\n      { ac = new AbortController(), debounce = 0, abortParallel = false } = {}\n    ) => {\n      setError(null);\n      setIsLoading(true);\n\n      if (title.trim().length === 0) {\n        setInitialState();\n        debounce && debouncedFetchBooksByTitle.cancel();\n        return abortController.abortAll();\n      }\n\n      if (abortParallel) {\n        abortController.abortAll();\n      }\n\n      abortController.add(ac);\n\n      const fetch = debounce\n        ? debouncedFetchBooksByTitle.setTime(debounce)\n        : fetchBooksByTitle;\n\n      try {\n        const books = await fetch(title, { signal: ac.signal });\n        setBooks(books);\n      } catch (error) {\n        if (!abortController.isAborted(ac)) setError(error);\n      } finally {\n        if (!abortController.isAborted(ac)) setIsLoading(false);\n        abortController.abort(ac);\n      }\n    },\n    []\n  );\n\n  useEffect(() => {\n    getBooksByTitle(title);\n    return () => abortController.cleanUp();\n  }, []);\n\n  return {\n    books,\n    isLoading,\n    error,\n    refetch: getBooksByTitle,\n  };\n};\n\nexport default useBooksApi;\n",
            "path": "src/books/BooksStandard2/useBooksApi.js"
          }
        ],
        "path": "src/books/BooksStandard2"
      },
      {
        "name": "BooksUse",
        "nodes": [
          {
            "name": "BooksUse.js",
            "content": "import { Suspense } from 'react';\nimport { ErrorBoundary } from 'react-error-boundary';\n\nimport Page from '@/ui/Page';\nimport BooksListStates from '@/ui/BooksListStates';\nimport { BasicInput } from '@/ui/SearchInput';\n\nimport SuspendableResource from './SuspendableResource';\n\nimport useInputWithDebouncedParam from '@/hooks/useInputWithDebouncedParam';\n\nimport memoize from '@/api/memoize';\nimport { fetchBooksByTitle } from '@/api/books';\n\nconst mFetchBooksByTitle = memoize(fetchBooksByTitle);\n\nconst Books = () => {\n  const { input, param } = useInputWithDebouncedParam({\n    paramName: 'title',\n  });\n\n  return (\n    <Page>\n      <BasicInput\n        autoFocus\n        name=\"title\"\n        placeholder=\"book title...\"\n        value={input.value}\n        onChange={input.onChange}\n      />\n      {!param.hasValue && <BooksListStates.EmptyTitle />}\n      {param.hasValue && (\n        <ErrorBoundary\n          FallbackComponent={({ resetErrorBoundary }) => (\n            // TODO: fix retry\n            <BooksListStates.Error onRetry={resetErrorBoundary} />\n          )}\n          resetKeys={[param.value]}\n        >\n          <Suspense fallback={<BooksListStates.Loading />}>\n            <SuspendableResource suspender={mFetchBooksByTitle(param.value)}>\n              {(data) =>\n                data.length > 0 ? (\n                  <BooksListStates.Success books={data} />\n                ) : (\n                  <BooksListStates.Empty />\n                )\n              }\n            </SuspendableResource>\n          </Suspense>\n        </ErrorBoundary>\n      )}\n    </Page>\n  );\n};\n\nexport default Books;\n",
            "path": "src/books/BooksUse/BooksUse.js"
          },
          {
            "name": "SuspendableResource.js",
            "content": "import { use } from 'react';\n\nconst SuspendableResource = ({ suspender, children }) => {\n  console.log('run suspense', suspender);\n  const data = use(suspender);\n\n  return children(data);\n};\n\nexport default SuspendableResource;\n",
            "path": "src/books/BooksUse/SuspendableResource.js"
          },
          {
            "name": "index.js",
            "content": "export { default } from './BooksUse';\n",
            "path": "src/books/BooksUse/index.js"
          }
        ],
        "path": "src/books/BooksUse"
      },
      {
        "name": "BooksUseQuery",
        "nodes": [
          {
            "name": "BooksUseQuery.js",
            "content": "import Page from '@/ui/Page';\nimport BooksListStates from '@/ui/BooksListStates';\nimport SearchInput from '@/ui/SearchInput';\n\nimport useBooks from './useBooks';\n\nconst Books = () => {\n  const {\n    books,\n    isLoading,\n    isSuccess,\n    isEmptySuccess,\n    isEmptyTitle,\n    isApiError,\n    refetch,\n    input,\n  } = useBooks();\n\n  return (\n    <Page>\n      <SearchInput\n        autoFocus\n        name=\"title\"\n        placeholder=\"book title...\"\n        value={input.value}\n        onChange={input.onChange}\n        isLoading={isLoading}\n        isSuccess={isSuccess}\n        isEmpty={isEmptyTitle}\n        isEmptySuccess={isEmptySuccess}\n        isError={isApiError}\n      />\n      {isSuccess && <BooksListStates.Success books={books} />}\n      {isLoading && <BooksListStates.Loading />}\n      {isEmptySuccess && <BooksListStates.Empty />}\n      {isApiError && <BooksListStates.Error onRetry={refetch} />}\n      {isEmptyTitle && <BooksListStates.EmptyTitle />}\n    </Page>\n  );\n};\n\nexport default Books;\n",
            "path": "src/books/BooksUseQuery/BooksUseQuery.js"
          },
          {
            "name": "ProvidedBooks.js",
            "content": "import { QueryClient, QueryClientProvider } from '@tanstack/react-query';\n\nimport Books from './BooksUseQuery';\n\nconst queryClient = new QueryClient();\n\nconst ProvidedBooks = () => (\n  <QueryClientProvider client={queryClient}>\n    <Books />\n  </QueryClientProvider>\n);\n\nexport default ProvidedBooks;\n",
            "path": "src/books/BooksUseQuery/ProvidedBooks.js"
          },
          {
            "name": "index.js",
            "content": "export { default } from './ProvidedBooks';\n",
            "path": "src/books/BooksUseQuery/index.js"
          },
          {
            "name": "useBooks.js",
            "content": "import { useQuery } from '@tanstack/react-query';\n\nimport useInputWithDebouncedParam from '@/hooks/useInputWithDebouncedParam';\n\nimport { fetchBooksByTitle } from '@/api/books';\n\nconst useBooks = () => {\n  const { input, param } = useInputWithDebouncedParam({\n    paramName: 'title',\n  });\n\n  const {\n    data: books,\n    isFetched,\n    isLoading,\n    isError,\n    refetch,\n  } = useQuery({\n    queryKey: [param.value],\n    queryFn: () => fetchBooksByTitle(param.value),\n    enabled: param.hasValue,\n    retry: false,\n    refetchOnWindowFocus: false,\n    refetchOnReconnect: false,\n  });\n\n  const isSuccess = Boolean(isFetched && books && books.length);\n  const isEmptySuccess = Boolean(isFetched && books && !books.length);\n\n  return {\n    books,\n    isLoading,\n    isSuccess,\n    isEmptySuccess,\n    isEmptyTitle: !param.hasValue,\n    isApiError: isError,\n    refetch,\n    input,\n  };\n};\n\nexport default useBooks;\n",
            "path": "src/books/BooksUseQuery/useBooks.js"
          }
        ],
        "path": "src/books/BooksUseQuery"
      },
      {
        "name": "BooksUseSWR",
        "nodes": [
          {
            "name": "BooksUseSWR.js",
            "content": "import Page from '@/ui/Page';\nimport BooksListStates from '@/ui/BooksListStates';\nimport SearchInput from '@/ui/SearchInput';\n\nimport useBooks from './useBooks';\n\nconst Books = () => {\n  const {\n    books,\n    isLoading,\n    isSuccess,\n    isEmptySuccess,\n    isEmptyTitle,\n    isApiError,\n    refetch,\n    input,\n  } = useBooks();\n\n  return (\n    <Page>\n      <SearchInput\n        autoFocus\n        name=\"title\"\n        placeholder=\"book title...\"\n        value={input.value}\n        onChange={input.onChange}\n        isLoading={isLoading}\n        isSuccess={isSuccess}\n        isEmpty={isEmptyTitle}\n        isEmptySuccess={isEmptySuccess}\n        isError={isApiError}\n      />\n      {isSuccess && <BooksListStates.Success books={books} />}\n      {isLoading && <BooksListStates.Loading />}\n      {isEmptySuccess && <BooksListStates.Empty />}\n      {isApiError && <BooksListStates.Error onRetry={refetch} />}\n      {isEmptyTitle && <BooksListStates.EmptyTitle />}\n    </Page>\n  );\n};\n\nexport default Books;\n",
            "path": "src/books/BooksUseSWR/BooksUseSWR.js"
          },
          {
            "name": "index.js",
            "content": "export { default } from './BooksUseSWR';\n",
            "path": "src/books/BooksUseSWR/index.js"
          },
          {
            "name": "useBooks.js",
            "content": "import useSWR from 'swr';\n\nimport useInputWithDebouncedParam from '@/hooks/useInputWithDebouncedParam';\n\nimport { fetchBooksByTitle } from '@/api/books';\n\nconst swrConfig = {\n  revalidateIfStale: false,\n  revalidateOnFocus: false,\n  revalidateOnReconnect: false,\n};\n\nconst useBooks = () => {\n  const { input, param } = useInputWithDebouncedParam({ paramName: 'title' });\n  const {\n    data: books,\n    isLoading,\n    error,\n    mutate,\n  } = useSWR(param.value, fetchBooksByTitle, swrConfig);\n\n  const refetch = () => mutate(undefined, { revalidate: true });\n\n  const isFetched = Boolean(books);\n  const isSuccess = Boolean(isFetched && books.length);\n  const isEmptySuccess = Boolean(isFetched && !books.length);\n  const isApiError = Boolean(error) && !isFetched && !isLoading;\n\n  return {\n    books,\n    isLoading,\n    isSuccess,\n    isEmptySuccess,\n    isEmptyTitle: !param.hasValue,\n    isApiError,\n    refetch,\n    input,\n  };\n};\n\nexport default useBooks;\n",
            "path": "src/books/BooksUseSWR/useBooks.js"
          }
        ],
        "path": "src/books/BooksUseSWR"
      },
      {
        "name": "BooksUseSuspenseQuery",
        "nodes": [
          {
            "name": "BooksUseSuspenseQuery.js",
            "content": "import { Suspense } from 'react';\nimport { useQueryErrorResetBoundary } from '@tanstack/react-query';\nimport { ErrorBoundary } from 'react-error-boundary';\n\nimport Page from '@/ui/Page';\nimport BooksListStates from '@/ui/BooksListStates';\nimport { BasicInput } from '@/ui/SearchInput';\n\nimport { fetchBooksByTitle } from '@/api/books';\n\nimport SuspendableResource from './SuspendableResource';\n\nimport useInputWithDebouncedParam from '@/hooks/useInputWithDebouncedParam';\n\nconst Books = () => {\n  const { input, param } = useInputWithDebouncedParam({\n    paramName: 'title',\n  });\n\n  const { reset } = useQueryErrorResetBoundary();\n\n  return (\n    <Page>\n      <BasicInput\n        autoFocus\n        name=\"title\"\n        placeholder=\"book title...\"\n        value={input.value}\n        onChange={input.onChange}\n      />\n      <ErrorBoundary\n        FallbackComponent={({ resetErrorBoundary }) => (\n          <BooksListStates.Error onRetry={resetErrorBoundary} />\n        )}\n        onReset={reset}\n        resetKeys={[param.value]}\n      >\n        <Suspense fallback={<BooksListStates.Loading />}>\n          {param.hasValue && (\n            <SuspendableResource\n              query={param.value}\n              fetcher={fetchBooksByTitle}\n              onSuccess={(data) => <BooksListStates.Success books={data} />}\n              onEmpty={() => <BooksListStates.Empty />}\n            />\n          )}\n          {!param.hasValue && <BooksListStates.EmptyTitle />}\n        </Suspense>\n      </ErrorBoundary>\n    </Page>\n  );\n};\n\nexport default Books;\n",
            "path": "src/books/BooksUseSuspenseQuery/BooksUseSuspenseQuery.js"
          },
          {
            "name": "ProvidedBooks.js",
            "content": "import { QueryClient, QueryClientProvider } from '@tanstack/react-query';\n\nimport Books from './BooksUseSuspenseQuery';\n\nconst queryClient = new QueryClient();\n\nconst ProvidedBooks = () => (\n  <QueryClientProvider client={queryClient}>\n    <Books />\n  </QueryClientProvider>\n);\n\nexport default ProvidedBooks;\n",
            "path": "src/books/BooksUseSuspenseQuery/ProvidedBooks.js"
          },
          {
            "name": "SuspendableResource.js",
            "content": "import { useSuspenseQuery } from '@tanstack/react-query';\n\nconst SuspendableResource = ({ onSuccess, onEmpty, query, fetcher }) => {\n  const { data } = useSuspenseQuery({\n    queryKey: [query],\n    queryFn: () => fetcher(query),\n  });\n\n  if (data.length > 0) return onSuccess(data);\n  if (data.length === 0) return onEmpty();\n};\n\nexport default SuspendableResource;\n",
            "path": "src/books/BooksUseSuspenseQuery/SuspendableResource.js"
          },
          {
            "name": "index.js",
            "content": "export { default } from './ProvidedBooks';\n",
            "path": "src/books/BooksUseSuspenseQuery/index.js"
          }
        ],
        "path": "src/books/BooksUseSuspenseQuery"
      },
      {
        "name": "BooksUseSuspenseSWR",
        "nodes": [
          {
            "name": "BooksUseSuspenseSWR.js",
            "content": "import { Suspense } from 'react';\nimport { ErrorBoundary } from 'react-error-boundary';\n\nimport Page from '@/ui/Page';\nimport BooksListStates from '@/ui/BooksListStates';\nimport { BasicInput } from '@/ui/SearchInput';\n\nimport useInputWithDebouncedParam from '@/hooks/useInputWithDebouncedParam';\nimport { fetchBooksByTitle } from '@/api/books';\n\nimport SuspendableResource from './SuspendableResource';\n\nimport useSWRErrorBoundaryReset from './useSWRErrorBoundaryReset';\n\nconst Books = () => {\n  const { input, param } = useInputWithDebouncedParam({\n    paramName: 'title',\n  });\n\n  const { reset } = useSWRErrorBoundaryReset();\n\n  return (\n    <Page>\n      <BasicInput\n        autoFocus\n        name=\"title\"\n        placeholder=\"book title...\"\n        value={input.value}\n        onChange={input.onChange}\n      />\n      <ErrorBoundary\n        FallbackComponent={({ resetErrorBoundary }) => (\n          <BooksListStates.Error\n            onRetry={() => resetErrorBoundary(param.value)}\n          />\n        )}\n        onReset={reset}\n        resetKeys={[param.value]}\n      >\n        <Suspense fallback={<BooksListStates.Loading />}>\n          {param.hasValue && (\n            <SuspendableResource\n              fetcher={fetchBooksByTitle}\n              query={param.value}\n              onSuccess={(data) => <BooksListStates.Success books={data} />}\n              onEmpty={() => <BooksListStates.Empty />}\n            />\n          )}\n          {!param.hasValue && <BooksListStates.EmptyTitle />}\n        </Suspense>\n      </ErrorBoundary>\n    </Page>\n  );\n};\n\nexport default Books;\n",
            "path": "src/books/BooksUseSuspenseSWR/BooksUseSuspenseSWR.js"
          },
          {
            "name": "SuspendableResource.js",
            "content": "import useSWR from 'swr';\n\nconst swrConfig = {\n  revalidateIfStale: false,\n  revalidateOnFocus: false,\n  revalidateOnReconnect: false,\n};\n\nconst SuspendableResource = ({ onSuccess, onEmpty, query, fetcher }) => {\n  const { data } = useSWR(query, fetcher, {\n    ...swrConfig,\n    suspense: true,\n  });\n\n  if (data.length > 0) return onSuccess(data);\n  if (data.length === 0) return onEmpty();\n};\n\nexport default SuspendableResource;\n",
            "path": "src/books/BooksUseSuspenseSWR/SuspendableResource.js"
          },
          {
            "name": "index.js",
            "content": "export { default } from './BooksUseSuspenseSWR';\n",
            "path": "src/books/BooksUseSuspenseSWR/index.js"
          },
          {
            "name": "useSWRErrorBoundaryReset.js",
            "content": "import { useSWRConfig } from 'swr';\n\nconst ERROR_BOUNDARY_RESET_REASON = {\n  KEYS: 'keys',\n  IMPERATIVE_API: 'imperative-api',\n};\n\nconst getKey = (reset) => {\n  switch (reset.reason) {\n    case ERROR_BOUNDARY_RESET_REASON.KEYS:\n      return reset.prev[0];\n    case ERROR_BOUNDARY_RESET_REASON.IMPERATIVE_API:\n      return reset.args[0];\n    default:\n      throw Error(`Unknown ErrorBoundary reset reason: ${reset.reason}`);\n  }\n};\n\nconst useSWRErrorBoundaryReset = () => {\n  const { mutate } = useSWRConfig();\n  const reset = (reset) => {\n    const key = getKey(reset);\n\n    mutate(key, undefined, { revalidate: true });\n  };\n\n  return { reset };\n};\n\nexport default useSWRErrorBoundaryReset;\n",
            "path": "src/books/BooksUseSuspenseSWR/useSWRErrorBoundaryReset.js"
          }
        ],
        "path": "src/books/BooksUseSuspenseSWR"
      },
      {
        "name": "Resource",
        "nodes": [
          {
            "name": "BooksResource.js",
            "content": "import Page from '@/ui/Page';\nimport BooksListStates from '@/ui/BooksListStates';\nimport { BasicInput } from '@/ui/SearchInput';\n\nimport useInputWithDebouncedParam from '@/hooks/useInputWithDebouncedParam';\n\nimport memoize from '@/api/memoize';\nimport { fetchBooksByTitle } from '@/api/books';\nimport Resource from './Resource';\n\nconst mFetchBooksByTitle = memoize(fetchBooksByTitle);\n\nconst Books = () => {\n  const { input, param } = useInputWithDebouncedParam({ paramName: 'title' });\n\n  return (\n    <Page>\n      <BasicInput autofocus value={input.value} onChange={input.onChange} />\n      <Resource\n        promise={param.hasValue ? mFetchBooksByTitle(param.value) : null}\n        onIdle={() => <BooksListStates.EmptyTitle />}\n        onLoading={<BooksListStates.Loading />}\n        onSuccess={(data) => <BooksListStates.Success books={data} />}\n        onError={({ resetErrorBoundary }) => (\n          <BooksListStates.Error onRetry={resetErrorBoundary} />\n        )}\n        resetKey={title}\n        flags={(data) => ({ empty: data.length === 0 })}\n        onEmpty={() => <BooksListStates.Empty />}\n      />\n    </Page>\n  );\n};\n\nexport default Books;\n",
            "path": "src/books/Resource/BooksResource.js"
          },
          {
            "name": "Resource.js",
            "content": "import { Suspense } from 'react';\nimport { ErrorBoundary } from 'react-error-boundary';\n\nimport SuspendableResource from './SuspendableResource';\n\nconst capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);\n\nconst Resource = ({\n  promise,\n  onIdle,\n  onLoading,\n  onSuccess,\n  onError,\n  resetKey,\n  flags,\n  children,\n  ...props\n}) => {\n  if (!promise) return onIdle();\n\n  return (\n    <ErrorBoundary FallbackComponent={onError} resetKeys={[resetKey]}>\n      <Suspense fallback={onLoading}>\n        <SuspendableResource suspender={promise} flags={flags}>\n          {({ data, flags = {} }) => {\n            // move flags func execution here instaed of passing it to SuspendableResource\n            const activeFlags = Object.entries(flags).filter(\n              ([_, value]) => value\n            );\n\n            if (activeFlags.length === 0) return onSuccess(data);\n\n            const flagsResult = activeFlags.map(([key]) => {\n              const handlerKey = `on${capitalize(key)}`;\n              const handler = props[handlerKey];\n              return handler(data);\n            });\n\n            return flagsResult;\n          }}\n        </SuspendableResource>\n      </Suspense>\n    </ErrorBoundary>\n  );\n};\n\nexport default Resource;\n",
            "path": "src/books/Resource/Resource.js"
          },
          {
            "name": "SuspendableResource.js",
            "content": "import { use } from 'react';\n\nconst SuspendableResource = ({ suspender, children, flags = () => {} }) => {\n  let data;\n  if (suspender) data = use(suspender);\n\n  return children({ data, flags: flags(data) });\n};\n\nexport default SuspendableResource;\n",
            "path": "src/books/Resource/SuspendableResource.js"
          },
          {
            "name": "index.js",
            "content": "export { default } from './BooksResource';\n",
            "path": "src/books/Resource/index.js"
          }
        ],
        "path": "src/books/Resource"
      }
    ],
    "path": "books"
  },
  {
    "name": "hooks",
    "nodes": [
      {
        "name": "useDebounce.js",
        "content": "import { useLayoutEffect, useMemo, useRef } from 'react';\nimport _debounce from 'lodash/debounce';\n\nconst useDebounce = (callback, delay) => {\n  const callbackRef = useRef(callback);\n\n  useLayoutEffect(() => {\n    callbackRef.current = callback;\n  });\n\n  return useMemo(\n    () => _debounce((...args) => callbackRef.current(...args), delay),\n    [delay]\n  );\n};\n\nexport default useDebounce;\n",
        "path": "src/hooks/useDebounce.js"
      },
      {
        "name": "useDebouncedParam.js",
        "content": "import { useSearchParams } from 'react-router-dom';\nimport useDebounce from './useDebounce';\n\nconst useDebouncedParam = ({ paramName, debounce, defaultValue }) => {\n  const [searchParams, setSearchParams] = useSearchParams(\n    new URLSearchParams({ [paramName]: '' })\n  );\n  const dSetParam = useDebounce(setSearchParams, debounce);\n  const param = searchParams.get(paramName) || defaultValue;\n\n  const dSetSelectedParam = (value) => {\n    dSetParam({ [paramName]: value }, { replace: false });\n  };\n\n  return {\n    value: param,\n    dSetSelectedParam,\n  };\n};\n\nexport default useDebouncedParam;\n",
        "path": "src/hooks/useDebouncedParam.js"
      },
      {
        "name": "useInput.js",
        "content": "import { useState } from 'react';\n\nconst useInput = ({ defaultValue }) => {\n  const [value, setValue] = useState(defaultValue);\n\n  const onChange = (e) => setValue(e.target.value);\n\n  return {\n    value,\n    setValue,\n    onChange,\n  };\n};\n\nexport default useInput;\n",
        "path": "src/hooks/useInput.js"
      },
      {
        "name": "useInputWithDebouncedParam.js",
        "content": "import { useEffect } from 'react';\n\nimport useInput from './useInput';\nimport useDebouncedParam from './useDebouncedParam';\n\nconst useInputWithDebouncedParam = ({ debounce = 300, paramName } = {}) => {\n  const param = useDebouncedParam({\n    debounce,\n    paramName,\n    defaultValue: '',\n  });\n\n  const input = useInput({ defaultValue: param.value });\n\n  useEffect(() => {\n    input.setValue(param.value);\n  }, [param.value]);\n\n  const onChange = (e) => {\n    const newValue = e.target.value;\n    input.setValue(newValue);\n    param.dSetSelectedParam(newValue);\n  };\n\n  return {\n    input: {\n      value: input.value,\n      hasValue: Boolean(input.value.trim()),\n      onChange,\n    },\n    param: {\n      value: param.value,\n      hasValue: Boolean(param.value.trim()),\n    },\n  };\n};\n\nexport default useInputWithDebouncedParam;\n",
        "path": "src/hooks/useInputWithDebouncedParam.js"
      }
    ],
    "path": "hooks"
  }
];