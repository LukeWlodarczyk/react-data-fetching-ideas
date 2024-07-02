import { useRef } from 'react';

let id = 0;
const genId = () => {
    return id++;
}

const useAbortController = () => {
    const abortControllers = useRef([]);

    const add = ac =>  {
      ac.id = genId();
      abortControllers.current = [ac, ...abortControllers.current];
    };

    const isAborted = ac => ac.signal.aborted;

    const abort = ac => !isAborted(ac) && ac.abort();

    const abortAll = () => abortControllers.current.forEach(ac => !isAborted(ac) && abort(ac));

    const removeAll = () => abortControllers.current = [];

    const cleanUp = () => {
      abortAll();
      removeAll();
    };

    const log = fn => arg => {
        console.log('before', fn.name, abortControllers.current);
        const result = fn(arg);
        console.log('after', fn.name, abortControllers.current, { result });
        return result;
    };

    return {
      add: log(add),
      isAborted: log(isAborted),
      abort: log(abort),
      abortAll: log(abortAll),
      cleanUp: log(cleanUp),
    };
}

export default useAbortController;