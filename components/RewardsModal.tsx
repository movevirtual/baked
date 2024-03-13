import React, { useEffect, useState } from 'react';

import Modal from '../../../../shared/components/Modal';
import { toast } from 'react-toastify';
import {
    getInviteUrl,
    getReferredCount,
} from '../../../../shared/services/User';
import ProgressChart from '../../home/ProgressChart';

type ShareModalProps = {
    showModal: boolean;
    handleClose: () => void;
};

const RewardsModal = ({ showModal, handleClose }: ShareModalProps) => {
    const [inviteUrl, setInviteUrl] = useState<string>();
    const [invitedCount, setInvitedCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const inviteUrlResponse = await getInviteUrl();
                const invitedCountResponse = await getReferredCount();
                setInviteUrl(inviteUrlResponse);
                setInvitedCount(invitedCountResponse);
            } catch (error) {
                posthog.capture('SHARE: Share modal error', { error });
                toast.error('Error fetching referral data', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url as string);
        toast.success('Link copied to clipboard', {
            position: 'top-right',
            autoClose: 3000,
        });
    };

    return (
        <>
            <Modal
                show={showModal}
                onClose={() => {
                    posthog.capture('SHARE: Share modal closed');
                    handleClose();
                }}
                customClassNames="flex w-[500px] transform flex-col justify-between overflow-auto rounded-2xl
                    bg-base-100 p-5 text-left align-middle shadow-xl h-[340px] transition-all md:overflow-hidden">
                <div className="h-full">
                    <div>
                        <h1 className="mb-3 text-xl font-semibold">
                            Referrals
                        </h1>
                        <div>
                            <h3>Invite your friends and earn rewards</h3>
                            <div className="my-4 text-sm">
                                For every <strong>5 friends</strong> you invite,
                                you will get{' '}
                                <strong>1 week of Eztrackr Pro</strong> for
                                free.
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col items-end justify-center">
                            {loading && (
                                <button className="btn-primary btn btn-sm">
                                    <span className="loading loading-spinner loading-md text-primary-content"></span>
                                </button>
                            )}
                            {!loading && inviteUrl && (
                                <>
                                    <div className="join w-full">
                                        <input
                                            type="text"
                                            className="input-bordered input join-item w-[80%] text-sm focus:outline-none"
                                            value={inviteUrl}
                                            readOnly
                                        />
                                        <button
                                            className="btn-secondary btn join-item ml-0.5"
                                            onClick={() =>
                                                copyToClipboard(
                                                    inviteUrl as string
                                                )
                                            }>
                                            Copy Link
                                        </button>
                                    </div>
                                    <div className="mt-6 w-full">
                                        <h3 className="text-sm">
                                            {invitedCount} out of{' '}
                                            {Math.ceil(invitedCount / 5) * 5}{' '}
                                            friends invited
                                        </h3>
                                        <ProgressChart
                                            count={
                                                Math.ceil(invitedCount / 5) * 5
                                            }
                                            maximum={invitedCount}
                                        />
                                    </div>
                                    {invitedCount > 4 && (
                                        <div>
                                            <p className="mt-5 text-xs">
                                                Please email us at
                                                info@eztrackr.app to redeem your
                                                reward :)
                                            </p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default RewardsModal;
