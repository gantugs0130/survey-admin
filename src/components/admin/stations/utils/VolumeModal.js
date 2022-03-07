import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Slider, Select, Input, PageHeader, TimePicker, Button, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import {
    stationSelectors,
    stationHandleCancel,
    onSubmitVolumeSave,
    onChangeHandlerVolume,
} from "../../../../slice/stationSlice";

const OutletBindModal = () => {
    const { selectedStation, volumeLoading, volumeModal } = useSelector(stationSelectors.getVolume);

    const dispatch = useDispatch();

    function onSubmitVolume() {
        let data = {
            id: selectedStation.id,
            volume: selectedStation.voiceLevel,
        };
        dispatch(onSubmitVolumeSave(data));
    }

    return (
        <Modal
            title={"Set volume"}
            width={380}
            visible={volumeModal}
            onOk={() => onSubmitVolume()}
            onCancel={() => dispatch(stationHandleCancel())}
            okText="Save"
            cancelText="Close"
            confirmLoading={volumeLoading}
            maskClosable={false}
        >
            <Slider
                min={0}
                max={15}
                onChange={(e) => dispatch(onChangeHandlerVolume(e))}
                value={
                    typeof selectedStation.voiceLevel === "number" ? selectedStation.voiceLevel : 0
                }
            />
        </Modal>
    );
};
export default OutletBindModal;
