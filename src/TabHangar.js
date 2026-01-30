import React from 'react';
import { useDispatch, connect } from 'react-redux';
import {
    setHangarCooldown,
} from './redux/userInfoSlice.js';
import { 
    pushPopup,
    clearStack,
} from './redux/popupSlice.js';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { staticInfo } from './InfoContext';
import { formatTimeString } from './Utility';
import blank from "./img/blank.png";

const mapStatetoProps = (state) => {
    let newProps = {
        owned: state.userInfo.hangar.owned,
        cooldown: state.userInfo.hangar.cooldown,
        disableSetup: state.session.banner[0] === "BannerSelectLocation" || state.session.banner[0] === "BannerCustomLocation",
    }
    return newProps;
}

export const TabHangar = (props) => {
    
    const dispatch = useDispatch();

    function showSetupHangar(e) {
        dispatch(clearStack());
        dispatch(pushPopup("PopupSetupHangar"));
    }

    function startRooster(e) {
        let newTime = 48 * 60 * 1000;
        dispatch(setHangarCooldown(newTime));
    }

    const disableButton = props.cooldown > 0;
    let buttonString;
    if (disableButton) {
        buttonString = formatTimeString(props.cooldown);
    }
    else {
        buttonString = "Source (Rooster)";
    }
    let content = null;
    if (props.owned) {
        content = (
            <div className="content">
                <div className="fsz">
                    <button onClick={startRooster} disabled={disableButton} className="button purple">{buttonString}</button>
                </div>
            </div>
        );
    }

    return (
        <div id="hangar" className="information">
            <div className="business_heading clearfix">
                <div className = "icon_wrap">
                    <img src={blank} className="icons icons-info icons-hangar" alt={staticInfo.hangar.fullName + " icon"}/>
                </div>
                <h1>{staticInfo.hangar.shortName}</h1>
                <button onClick={showSetupHangar} disabled={props.disableSetup} className="button setup">
                    <FontAwesomeIcon icon={faCog} />
                </button>
            </div>
            {content}
        </div>
    );
}

export default connect(mapStatetoProps)(TabHangar);