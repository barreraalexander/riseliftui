import { commondata } from "@/app/layout";
import './Introduction.css'

export default function Introduction() {
  return (
    <section className="introduction_section">
        <div className="uprise_circle pulse_blob">
            <h1>
                {commondata.app_display_name}
            </h1>
            <h3>
                SMART EXERCISE TRACKER
            </h3>
            <small>
                Click here to get started
            </small>
        </div>
    </section>
  );
}
