"use client";   

import './Explanation.css'
import mercury from "@/app/public/assets/images/mercuryflyby.jpg"

import { SetStateAction, useRef, useState, Dispatch } from 'react';
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap';

import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ExplanationCards } from '@/app/data/models';

import Step1Card from './components/Step1Card';
import Step2Card from './components/Step2Card';
import Step3Card from './components/Step3Card';
gsap.registerPlugin(ScrollTrigger);




export default function Explanation() {
    const explanation_section_ref = useRef<HTMLDivElement>(null);
    const mercury_ref = useRef<HTMLImageElement>(null);
    const mercury_text = useRef<HTMLParagraphElement>(null);

    const [
        selected_explanation_card,
        set_selected_explanation_card
    ] = useState<ExplanationCards>(ExplanationCards.STEP1)


    useGSAP(
        () => {

            if (explanation_section_ref.current) {
                gsap.fromTo(
                    [
                        mercury_ref.current,
                        mercury_text.current
                    ],
                    {
                        opacity: 0,
                        y: 50
                    }, // From state: invisible and slightly below
                    {
                        opacity: 1,
                        y: 0, // To state: visible and in original position
                        duration: 8,
                        delay: 2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: explanation_section_ref.current, // The element that triggers the animation
                            start: "top 70%", // When the top of the trigger hits 80% down the viewport
                            end: "bottom 20%", // When the bottom of the trigger hits 20% up the viewport
                            scrub: true, // Smoothly link animation progress to scroll position
                            markers: true, // Optional: show markers for debugging start/end points
                        }
                    }
                );
                gsap.fromTo(
                    [
                        mercury_ref.current,
                        // mercury_text.current
                    ],
                    {
                        filter: "brightness(0)",
                        // y: 50
                    }, // From state: invisible and slightly below
                    {
                        filter: "brightness(1.5)",
                        // opacity: 1,
                        // y: 0, // To state: visible and in original position
                        duration: 2,
                        delay: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: explanation_section_ref.current, // The element that triggers the animation
                            start: "top 80%", // When the top of the trigger hits 80% down the viewport
                            end: "bottom 20%", // When the bottom of the trigger hits 20% up the viewport
                            scrub: true, // Smoothly link animation progress to scroll position
                            markers: true, // Optional: show markers for debugging start/end points
                        }
                    }
                );
            }   
        },
        {
            scope: explanation_section_ref
        }
    );

    return (
    <div ref={explanation_section_ref} className="explanation_section">
        <div ref={mercury_text} className="app_explanation">
            <h1 className="display-4">
                Discover Your Potential
            </h1>
            <div className="steps_container mt-2 d-flex flex-column justify-content-center align-items-center gap-5">


                <div
                    className="steps_card card text-white bg-dark text-center"
                >
                    <div
                        className="card-header"
                    >
                        <ul
                            className="nav nav-tabs card-header-tabs"
                        >
                            <ExplanationCardNavItem
                                selected_explanation_card={selected_explanation_card}
                                set_selected_explanation_card={set_selected_explanation_card}
                                explanation_card={ExplanationCards.STEP1}
                            />
                            <ExplanationCardNavItem
                                selected_explanation_card={selected_explanation_card}
                                set_selected_explanation_card={set_selected_explanation_card}
                                explanation_card={ExplanationCards.STEP2}
                            />
                            <ExplanationCardNavItem
                                selected_explanation_card={selected_explanation_card}
                                set_selected_explanation_card={set_selected_explanation_card}
                                explanation_card={ExplanationCards.STEP3}
                            />


                        </ul>
                    </div>
                    <ExplanationCardInner selected_explanation_card={selected_explanation_card}/>

                </div>


            </div>

        </div>
        <img ref={mercury_ref} className="mercury_img" src={mercury.src}/>
    </div>
  );
}




type ExplanationCardNavItemProps  = {
    selected_explanation_card: ExplanationCards,
    
    set_selected_explanation_card: Dispatch<
        SetStateAction<
            ExplanationCards
        >
    >
    explanation_card: ExplanationCards
}



const ExplanationCardNavItem: React.FC<
    ExplanationCardNavItemProps
> = (
    {
        selected_explanation_card,
        set_selected_explanation_card,
        explanation_card
    }
) => {

    var active_class = ""

    if (selected_explanation_card==explanation_card){
        active_class = "active"
    }


    const number_rep = explanation_card.valueOf() + 1

    return (
    <li
        className="nav-item"
        onClick={
            () => {
                set_selected_explanation_card(explanation_card)
            }
        }
    >
        <p
            className={`nav-link ${active_class}`}
        >
            00{number_rep}
        </p>
    </li>
    )
}


type ExplanationCardInnerProps  = {
    selected_explanation_card: ExplanationCards
}


const ExplanationCardInner: React.FC<
    ExplanationCardInnerProps
> = (
    { selected_explanation_card }
) => {



    if (selected_explanation_card==ExplanationCards.STEP1){
        return <Step1Card/>        
    }

    if (selected_explanation_card==ExplanationCards.STEP2){
        return <Step2Card/>        
    }

    if (selected_explanation_card==ExplanationCards.STEP3){
        return <Step3Card/>        
    }




    return (
    <div
        className="card-body"
    >
        <h5
            className="card-title"
        >
            Special title treatment
        </h5>
        <p
            className="card-text"
        >
            With supporting text below as a natural lead-in to additional content.
        </p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>


    )

}