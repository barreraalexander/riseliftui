import { commondata } from "./layout";

// <Image
// className={styles.logo}
// src="https://nextjs.org/icons/next.svg"
// alt="Next.js logo"
// width={180}
// height={38}
// priority
// />

import Introduction from "./components/introduction/Introduction";
import Explanation from "./components/explanation/Explanation";
import CallToAction from "./components/call_to_action/CallToAction";

export default function Landing() {
    return (
    <div className="d-flex flex-column">
        <Introduction/>
        <Explanation/>
        <CallToAction/>
    </div>

    );
}
