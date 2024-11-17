// Reference:
// useEvent RFC https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md

import { useCallback, useLayoutEffect, useRef } from "react";

export default function useEvent(
    callback
) {
    const callbackRef = useRef(callback);

    useLayoutEffect(() => {
        callbackRef.current = callback;
    });

    return useCallback(
        ((...args) => {
            return callbackRef.current?.(...args);
        }),
        [],
    );
}