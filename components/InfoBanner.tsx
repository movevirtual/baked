"use client";
import {
    Button,
    ButtonDropdown,
    ButtonDropdownLink,
    ButtonLink,
} from "@/components/Button";
import CancelModal from "@/components/CancelModal";
import MarkAsNoShowModal from "@/components/DoctorPortal/MarkAsNoShowModal";
import InfoBanner from "@/components/InfoBanner";
import { JoinCallButton } from "@/components/JoinCallButton";
import LocalDate from "@/components/LocalDate";
import { dateTimeOptions } from "@/lib/constants";
import { Dictionary } from "@/lib/types";
import { canMarkAsNoShow } from "@/lib/utils";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BodyText } from "../BodyText";
import { Dialog, DialogTrigger } from "../Dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../Dropdown";
import { Heading } from "../Heading";

type PatientInfoBannerProps = {
    bgImgSrc: string;
    translations: Dictionary;
    ticket: {
        id: string;
        status: string;
        booking: {
            bookingId: number;
            startTime: Date;
            endTime: Date;
            videoCallUrl?: string | null;
        };
        patient: { firstName: string; lastName: string };
    };
    now: Date;
    type?: "details" | "generic";
};

export const PatientInfoBanner = ({
                                      bgImgSrc,
                                      translations,
                                      ticket,
                                      now,
                                      type = "generic",
                                  }: PatientInfoBannerProps) => {
    const path = usePathname();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [marAsNoShowModalOpen, setMarkAsNoShowModalOpen] = useState(false);
    const [cancelModalOpen, setCancelModalOpen] = useState(false);

    const handleOpenMarkAsNoShowModal = () => {
        setDropdownOpen(false);
        setMarkAsNoShowModalOpen(true);
    };
    const handleOpenCancelModal = () => {
        setDropdownOpen(false);
        setCancelModalOpen(true);
    };

    const isCallEnded = ticket.booking.endTime < now;

    useEffect(() => {
        setDropdownOpen(false);
        setMarkAsNoShowModalOpen(false);
        setCancelModalOpen(false);
    }, [path]);

    return (
        <InfoBanner imgSrc={bgImgSrc} thin>
            {/* Heading */}
            <div className="whitespace-nowrap px-8">
                {type === "details" ? (
                    <>
                        <Heading level="h3" variant="md">
                            {
                                translations.doctorPortal.banner.callScheduled.heading
                                    .regularText
                            }
                        </Heading>
                        {ticket.booking.startTime && (
                            <BodyText variant="sm">
                                <LocalDate
                                    date={ticket.booking.startTime}
                                    format={dateTimeOptions}
                                />
                            </BodyText>
                        )}
                    </>
                ) : (
                    <>
                        <Link href={`${path}/${ticket.id}`} className="hover:underline">
                            <Heading level="h3" variant="md">
                                {`${ticket.patient.firstName} ${ticket.patient.lastName}`}
                            </Heading>
                        </Link>
                        <BodyText variant="sm">
                            <LocalDate
                                date={ticket.booking.startTime}
                                format={dateTimeOptions}
                            />
                        </BodyText>
                    </>
                )}
            </div>
            {/* Buttons */}
            <div className="hidden gap-4 lg:flex">
                {/* Patient Details - shows only on generic Banner */}
                {type === "generic" && (
                    <ButtonLink
                        href={`${path}/${ticket.id}`}
                        className="my-8 w-full"
                        variant="secondary-inverse"
                    >
                        {translations.doctorPortal.managePatients.nextTicket.patientDetails}
                    </ButtonLink>
                )}
                {/* Flag Patient and Mark As No Show - shows only on details Banner */}
                {type === "details" && (
                    <>
                        <Button className="my-8 w-full" variant="secondary-inverse">
                            {translations.doctorPortal.banner.flagPatient}
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    onClick={() => handleOpenMarkAsNoShowModal()}
                                    disabled={!canMarkAsNoShow(ticket.booking.startTime)}
                                    className="my-8 w-full"
                                    variant="secondary-inverse"
                                >
                                    {translations.doctorPortal.banner.markAsNoShow}
                                </Button>
                            </DialogTrigger>
                        </Dialog>
                    </>
                )}

                {/* Cancel call button - shows for both details and generic Banner */}
                {!isCallEnded && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => handleOpenCancelModal()}
                                disabled={ticket.booking.endTime < now}
                                className="my-8 w-full"
                                variant="secondary-inverse"
                            >
                                {
                                    translations.doctorPortal.banner.callScheduled
                                        .buttonSecondaryText
                                }
                            </Button>
                        </DialogTrigger>
                    </Dialog>
                )}
                {/* Join Call - shows for both details and generic Banner */}
                {!isCallEnded && ticket.booking.videoCallUrl && (
                    <JoinCallButton
                        callDetails={{
                            startTime: ticket.booking.startTime,
                            endTime: ticket.booking.endTime,
                            videoCallUrl: ticket.booking.videoCallUrl,
                        }}
                        label={
                            translations.doctorPortal.banner.callScheduled.buttonPrimaryText
                        }
                    />
                )}
            </div>

            {/* Dropdown */}
            <div className="flex: lg:hidden">
                <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            className=" inline-block rounded-full border border-border-secondary bg-[transparent] p-3 text-text-inverse outline-none hover:bg-interactive-secondary-darkest active:bg-interactive-secondary-darker"
                        >
                            <MoreHorizIcon width={16} />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="lg:hidden">
                        {/* Patient Details - shows only on generic Banner */}
                        {type === "generic" && (
                            <DropdownMenuItem>
                                <ButtonDropdownLink href={`${path}/${ticket.id}`}>
                                    {
                                        translations.doctorPortal.managePatients.nextTicket
                                            .patientDetails
                                    }
                                </ButtonDropdownLink>
                            </DropdownMenuItem>
                        )}
                        {/* Flag Patient and Mark As No Show - shows only on details Banner */}
                        {type === "details" && (
                            <>
                                <DropdownMenuItem>
                                    <ButtonDropdown>
                                        {translations.doctorPortal.banner.flagPatient}
                                    </ButtonDropdown>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <ButtonDropdown
                                                onClick={() => handleOpenMarkAsNoShowModal()}
                                                disabled={!canMarkAsNoShow(ticket.booking.startTime)}
                                            >
                                                {translations.doctorPortal.banner.markAsNoShow}
                                            </ButtonDropdown>
                                        </DialogTrigger>
                                    </Dialog>
                                </DropdownMenuItem>
                            </>
                        )}
                        {/* Cancel call button - shows for both details and generic Banner */}
                        {!isCallEnded && (
                            <DropdownMenuItem>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <ButtonDropdown
                                            onClick={() => handleOpenCancelModal()}
                                            disabled={ticket.booking.endTime < now}
                                        >
                                            {
                                                translations.doctorPortal.banner.callScheduled
                                                    .buttonSecondaryText
                                            }
                                        </ButtonDropdown>
                                    </DialogTrigger>
                                </Dialog>
                            </DropdownMenuItem>
                        )}

                        {/* Join Call - shows for both details and generic Banner */}
                        {!isCallEnded && ticket.booking.videoCallUrl && (
                            <DropdownMenuItem>
                                <JoinCallButton
                                    isInDropdown={true}
                                    callDetails={{
                                        startTime: ticket.booking.startTime,
                                        endTime: ticket.booking.endTime,
                                        videoCallUrl: ticket.booking.videoCallUrl,
                                    }}
                                    label={
                                        translations.doctorPortal.banner.callScheduled
                                            .buttonPrimaryText
                                    }
                                />
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Modals */}
            <MarkAsNoShowModal
                customOpen={marAsNoShowModalOpen}
                customSetOpen={setMarkAsNoShowModalOpen}
                translations={translations.doctorPortal.managePatients.noShowModal}
                ticketId={ticket.id}
                bookingId={Number(ticket.booking.bookingId)}
                redirectPath={
                    translations.doctorPortal.managePatients.noShowModal.redirectPath
                }
            />
            <CancelModal
                customOpen={cancelModalOpen}
                customSetOpen={setCancelModalOpen}
                translations={translations.doctorPortal.managePatients.cancelModal}
                bookingId={Number(ticket.booking.bookingId)}
                ticketId={ticket.id}
                redirectPath={
                    translations.doctorPortal.managePatients.cancelModal.redirectPath
                }
            />
        </InfoBanner>
    );
};

export default PatientInfoBanner;
