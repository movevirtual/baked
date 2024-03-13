import React, { ReactNode } from 'react';
import { ArrowRight } from 'phosphor-react';
import { ActionCardButtonColors } from '../JobOverview/jobOverviewUtils';

type Props = {
    image: ReactNode | string;
    description: string;
    CTAText: string;
    CTAClick: () => void;
    CTAColor?: ActionCardButtonColors;
    isScrollable?: boolean;
};

const SuggestionCard = (props: Props) => {
    return (
        <div
            className={`flex h-36 w-48 flex-shrink-0 cursor-pointer flex-col justify-between
                rounded-lg border bg-base-100 p-4 hover:shadow-md ${
                    props.isScrollable ? 'mb-5' : ''
                }`}
            onClick={props.CTAClick}>
            <div>
                {typeof props.image === 'string' ? (
                    <img src={props.image} alt={props.description} />
                ) : (
                    props.image
                )}
                <p className="mt-2 text-xs">{props.description}</p>
            </div>
            <p
                className={`mt-3 flex items-center gap-x-1 text-xs font-semibold`}>
                {props.CTAText}
                <ArrowRight size={16} weight="bold" />
            </p>
        </div>
    );
};

export default SuggestionCard;
