import { useEffect, useState } from "react";

import HostChannel from "../utils/HostChannel";
import useEvent from "../hooks/useEvent";

/**
 *
 * @param {{onMessage: HostChannel['onMessage']}} options
 * @returns
 */
export default function useHostChannel(
    options = {},
) {
    const onMessage = useEvent(options.onMessage);
    const [hostChannel] = useState(() => new HostChannel(onMessage));

    useEffect(() => {
        hostChannel.connect();
        return () => {
            hostChannel.disconnect();
        };
    }, [hostChannel]);

    return hostChannel;
}