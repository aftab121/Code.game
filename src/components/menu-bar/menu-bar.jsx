import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import bowser from 'bowser';
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import VM from 'scratch-vm';
import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import CommunityButton from './community-button.jsx';
import ShareButton from './share-button.jsx';
import { ComingSoonTooltip } from '../coming-soon/coming-soon.jsx';
import Divider from '../divider/divider.jsx';
import LanguageSelector from '../../containers/language-selector.jsx';
import SaveStatus from './save-status.jsx';
import SBFileUploader from '../../containers/sb-file-uploader.jsx';
import ProjectWatcher from '../../containers/project-watcher.jsx';
import MenuBarMenu from './menu-bar-menu.jsx';
import { MenuItem, MenuSection } from '../menu/menu.jsx';
import ProjectTitleInput from './project-title-input.jsx';
import AuthorInfo from './author-info.jsx';
import AccountNav from '../../containers/account-nav.jsx';
import LoginDropdown from './login-dropdown.jsx';
import SB3Downloader from '../../containers/sb3-downloader.jsx';
import DeletionRestorer from '../../containers/deletion-restorer.jsx';
import TurboMode from '../../containers/turbo-mode.jsx';
import MenuBarHOC from '../../containers/menu-bar-hoc.jsx';
import { openTipsLibrary } from '../../reducers/modals';
import { setPlayer } from '../../reducers/mode';
import blankimg from '../../../src/assets/images/blank.jpg'
import nproject2 from '../../../src/assets/images/new_project_2.jpg'
import nproject3 from '../../../src/assets/images/new_project_3.jpg'
import nproject4 from '../../../src/assets/images/new_project_4.jpg'
import nproject5 from '../../../src/assets/images/new_project_5.jpg'
import nproject6 from '../../../src/assets/images/new_project_6.jpg'
import nproject7 from '../../../src/assets/images/new_project_7.jpg'
import nproject8 from '../../../src/assets/images/new_project_8.jpg'
import convert_code from '../../../src/assets/images/convert_code.jpg'
import importscratchfile from '../../../src/assets/images/scratch-file.jpg'
import teaching_plan from '../../../src/assets/images/teaching_plan.jpg'

import extensiondevice1 from '../../../src/assets/images/extension-1.jpg'
import extensiondevice2 from '../../../src/assets/images/extension-2.jpg'
import extensiondevice3 from '../../../src/assets/images/extension-3.jpg'
import extensiondevice4 from '../../../src/assets/images/extension-4.jpg'
import extensiondevice5 from '../../../src/assets/images/extension-5.jpg'
import extensiondevice6 from '../../../src/assets/images/extension-6.jpg'
import extensiondevice7 from '../../../src/assets/images/extension-7.jpg'
import hardware1 from '../../../src/assets/images/hardware-1.jpg'
import hardware2 from '../../../src/assets/images/hardware-2.jpg'
import hardware3 from '../../../src/assets/images/hardware-3.jpg'
import hardware4 from '../../../src/assets/images/hardware-4.jpg'
import lgbackground from '../../../src/assets/images/login-background.jpg'
import add_hardware from '../../../src/assets/images/hardware.png'
import add_blocks from '../../../src/assets/images/add_blocks.png'
import setting from '../../../src/assets/images/setting.png'
import aboutusheadimg from '../../../src/assets/images/about-us-header.png'
import browserError from '../../../src/assets/images/browser-error.jpg'
import networkError from '../../../src/assets/images/network-error.jpg'
import systemError from '../../../src/assets/images/system-error.jpg'
import webGl from '../../../src/assets/images/webGL.jpg'
import searchgif from '../../../src/assets/images/search.gif'
import sharework from '../../../src/assets/images/sharework.jpg'

import {
   autoUpdateProject,
   getIsUpdating,
   getIsShowingProject,
   manualUpdateProject,
   requestNewProject,
   remixProject,
   saveProjectAsCopy
} from '../../reducers/project-state';
import {
   openAccountMenu,
   closeAccountMenu,
   accountMenuOpen,
   openFileMenu,
   closeFileMenu,
   fileMenuOpen,
   openEditMenu,
   closeEditMenu,
   editMenuOpen,
   openLanguageMenu,
   closeLanguageMenu,
   languageMenuOpen,
   openLoginMenu,
   closeLoginMenu,
   loginMenuOpen
} from '../../reducers/menus';
import collectMetadata from '../../lib/collect-metadata';
import styles from './menu-bar.css';
import Modalstyles from '../browser-modal/modal-popup.css';
import helpIcon from '../../lib/assets/icon--tutorials.svg';
import mystuffIcon from './icon--mystuff.png';
import profileIcon from './icon--profile.png';
import remixIcon from './icon--remix.svg';
import dropdownCaret from './dropdown-caret.svg';
import languageIcon from '../language-selector/language-icon.svg';
import aboutIcon from './icon--about.svg';
import scratchLogo from './CodeGamelogo.png';
import sharedMessages from '../../lib/shared-messages';
import ReactModal from 'react-modal';
const ariaMessages = defineMessages({
   language: {
      id: 'gui.menuBar.LanguageSelector',
      defaultMessage: 'language selector',
      description: 'accessibility text for the language selection menu'
   },
   tutorials: {
      id: 'gui.menuBar.tutorialsLibrary',
      defaultMessage: 'Tutorials',
      description: 'accessibility text for the tutorials button'
   }
});
const MenuBarItemTooltip = ({
   children,
   className,
   enable,
   id,
   place = 'bottom'
}) => {
   if (enable) {
      return (
         <React.Fragment>
            {children}
         </React.Fragment>
      );
   }
   return (
      <ComingSoonTooltip
         className={classNames(styles.comingSoon, className)}
         place={place}
         tooltipClassName={styles.comingSoonTooltip}
         tooltipId={id}
      >
         {children}
      </ComingSoonTooltip>
   );
};
MenuBarItemTooltip.propTypes = {
   children: PropTypes.node,
   className: PropTypes.string,
   enable: PropTypes.bool,
   id: PropTypes.string,
   place: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
};
const MenuItemTooltip = ({ id, isRtl, children, className }) => (
   <ComingSoonTooltip
      className={classNames(styles.comingSoon, className)}
      isRtl={isRtl}
      place={isRtl ? 'left' : 'right'}
      tooltipClassName={styles.comingSoonTooltip}
      tooltipId={id}
   >
      {children}
   </ComingSoonTooltip>
);
MenuItemTooltip.propTypes = {
   children: PropTypes.node,
   className: PropTypes.string,
   id: PropTypes.string,
   isRtl: PropTypes.bool
};
const AboutButton = props => (
   <Button
      className={classNames(styles.menuBarItem, styles.hoverable)}
      iconClassName={styles.aboutIcon}
      iconSrc={aboutIcon}
      onClick={props.onClick}
   />
);
AboutButton.propTypes = {
   onClick: PropTypes.func.isRequired
};

class MenuBar extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         IsModelOpen: false,
         IsModelOpenCodeconvert: false,
         IsModelOpensharework: false,
         IsModelOpenteachingplan: false,
         IsModelaboutUsinfo: false,
         IsModeldetectDevice: false,
         Isimportscratchfile: false,
         Isblocklabfile: false,
         Email: '',
         Password: '',
         Username: '',
         IsblockSignfile: false,
      }
      bindAll(this, [
         'handleClickNew',
         'handleClickRemix',
         'handleClickSave',
         'handleClickSaveAsCopy',
         'handleClickSeeCommunity',
         'handleClickShare',
         'handleKeyPress',
         'handleLanguageMouseUp',
         'handleRestoreOption',
         'getSaveToComputerHandler',
         'restoreOptionMessage'
      ]);
      this.Username = this.Username.bind(this);
      this.Password = this.Password.bind(this);
      this.Email = this.Email.bind(this);
      this.login = this.login.bind(this);
      this.signUp = this.signUp.bind(this);

   }
   componentDidMount() {
      document.addEventListener('keydown', this.handleKeyPress);
   }
   componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyPress);
   }
   handleClickNew() {
      // if the project is dirty, and user owns the project, we will autosave.
      // but if they are not logged in and can't save, user should consider
      // downloading or logging in first.
      // Note that if user is logged in and editing someone else's project,
      // they'll lose their work.
      const readyToReplaceProject = this.props.confirmReadyToReplaceProject(
         this.props.intl.formatMessage(sharedMessages.replaceProjectWarning)
      );
      this.props.onRequestCloseFile();
      if (readyToReplaceProject) {
         this.props.onClickNew(this.props.canSave && this.props.canCreateNew);
      }
      this.props.onRequestCloseFile();
   }
   handleClickRemix() {
      this.props.onClickRemix();
      this.props.onRequestCloseFile();
   }
   handleClickSave() {
      this.props.onClickSave();
      this.props.onRequestCloseFile();
   }
   handleClickSaveAsCopy() {
      this.props.onClickSaveAsCopy();
      this.props.onRequestCloseFile();
   }
   handleClickSeeCommunity(waitForUpdate) {
      if (this.props.shouldSaveBeforeTransition()) {
         this.props.autoUpdateProject(); // save before transitioning to project page
         waitForUpdate(true); // queue the transition to project page
      } else {
         waitForUpdate(false); // immediately transition to project page
      }
   }
   handleClickShare(waitForUpdate) {
      if (!this.props.isShared) {
         if (this.props.canShare) { // save before transitioning to project page
            this.props.onShare();
         }
         if (this.props.canSave) { // save before transitioning to project page
            this.props.autoUpdateProject();
            waitForUpdate(true); // queue the transition to project page
         } else {
            waitForUpdate(false); // immediately transition to project page
         }
      }
   }
   handleRestoreOption(restoreFun) {
      return () => {
         restoreFun();
         this.props.onRequestCloseEdit();
      };
   }
   handleKeyPress(event) {
      const modifier = bowser.mac ? event.metaKey : event.ctrlKey;
      if (modifier && event.key === 's') {
         this.props.onClickSave();
         event.preventDefault();
      }
   }
   getSaveToComputerHandler(downloadProjectCallback) {
      return () => {
         this.props.onRequestCloseFile();
         downloadProjectCallback();
         if (this.props.onProjectTelemetryEvent) {
            const metadata = collectMetadata(this.props.vm, this.props.projectTitle, this.props.locale);
            this.props.onProjectTelemetryEvent('projectDidSave', metadata);
         }
      };
   }
   handleLanguageMouseUp(e) {
      if (!this.props.languageMenuOpen) {
         this.props.onClickLanguage(e);
      }
   }
   restoreOptionMessage(deletedItem) {
      switch (deletedItem) {
         case 'Sprite':
            return (
               <FormattedMessage
                  defaultMessage="Restore Sprite"
                  description="Menu bar item for restoring the last deleted sprite."
                  id="gui.menuBar.restoreSprite"
               />
            );
         case 'Sound':
            return (
               <FormattedMessage
                  defaultMessage="Restore Sound"
                  description="Menu bar item for restoring the last deleted sound."
                  id="gui.menuBar.restoreSound"
               />
            );
         case 'Costume':
            return (
               <FormattedMessage
                  defaultMessage="Restore Costume"
                  description="Menu bar item for restoring the last deleted costume."
                  id="gui.menuBar.restoreCostume"
               />
            );
         default: {
            return (<FormattedMessage
               defaultMessage="Restore"
               description="Menu bar item for restoring the last deleted item in its disabled state." /* eslint-disable-line max-len */
               id="gui.menuBar.restore"
            />);
         }
      }
   }
   Email(event) {
      this.setState({ Email: event.target.value })
   }
   Password(event) {
      this.setState({ Password: event.target.value })
   }
   Username(event) {
      this.setState({ Username: event.target.value })
   }
   login(event) {
      debugger;
      console.log(this.state.Email);
      console.log(this.state.Password);
      debugger;
      fetch('http://38.17.55.191:8182/api/Login', {
         method: 'post',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            username: this.state.Email,
            password: this.state.Password
         })
      }).then((Response) => Response.json())
         .then((result) => {
            console.log(result);
            if (result.status == -1)
               alert(result.msg);
            else
            localStorage.setItem('User',result.email);
            alert(result.msg);
         }, (error) => {
            debugger;
            console.log(error);
         })
   }

   signUp(event) {
      debugger;
      console.log(this.state.Email);
      console.log(this.state.Password);
      console.log(this.state.Username);
      debugger;
      fetch('http://38.17.55.191:8182/api/SignUp', {
         method: 'post',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            username: this.state.Username,
            email: this.state.Email,
            password: this.state.Password
         })
      }).then((Response) => Response.json())
         .then((result) => {
            console.log(result);
            if (result.status == -1)
               alert(result.msg);
            else
               alert(result.msg);
         }, (error) => {
            debugger;
            console.log(error);
         })
   }

   

   render() {
      const saveNowMessage = (
         <FormattedMessage
            defaultMessage="Save now"
            description="Menu bar item for saving now"
            id="gui.menuBar.saveNow"
         />
      );
      const createCopyMessage = (
         <FormattedMessage
            defaultMessage="Save as a copy"
            description="Menu bar item for saving as a copy"
            id="gui.menuBar.saveAsCopy"
         />
      );
      const remixMessage = (
         <FormattedMessage
            defaultMessage="Remix"
            description="Menu bar item for remixing"
            id="gui.menuBar.remix"
         />
      );
      const openProjectMessage = (
         <FormattedMessage
            defaultMessage="Open"
            description="Menu bar item for creating a Open project"
            id="gui.menuBar.Open"
         />
      );
      const newProjectMessage = (
         <FormattedMessage
            defaultMessage="New"
            description="Menu bar item for creating a new project"
            id="gui.menuBar.new"
         />
      );
      const saveAsProjectMessage = (
         <FormattedMessage
            defaultMessage="Save As"
            description="Menu bar item for Save As a new project"
            id="gui.menuBar.Save_As"
         />
      );
      // tools tab constants start
      const teachingplanMessage = (
         <FormattedMessage
            defaultMessage="Teaching Plan"
            description="Menu bar item for Save As a new project"
            id="gui.menuBar.teachingplanMessage"
         />
      );
      const convertcodeMessage = (
         <FormattedMessage
            defaultMessage="Code Convert"
            description="Menu bar item for Save As a new project"
            id="gui.menuBar.convertcodeMessage"
         />
      );
      const scratchfileMessage = (
         <FormattedMessage
            defaultMessage="Scratch File"
            description="Menu bar item for Save As a new project"
            id="gui.menuBar.scratchfileMessage"
         />
      );
      // tools tab constants end
      const remixButton = (
         <Button
            className={classNames(
               styles.menuBarButton,
               styles.remixButton
            )}
            iconClassName={styles.remixButtonIcon}
            iconSrc={remixIcon}
            onClick={this.handleClickRemix}
         >
            {remixMessage}
         </Button>
      );
      // Show the About button only if we have a handler for it (like in the desktop app)
      const aboutButton = this.props.onClickAbout ?
         <AboutButton onClick={this.props.onClickAbout} />
         : null;
      const handleOpen = () => {
         this.setState({ IsModelOpen: true })
      }
      const OpenCodeconvert = () => {
         this.setState({ IsModelOpenCodeconvert: true })
      }
      const Opensharework = () => {
         this.setState({ IsModelOpensharework: true })
      }
      const Openteachingplan = () => {
         this.setState({ IsModelOpenteachingplan: true })
      }
     
      const aboutUsinfo = () => {
         this.setState({ IsModelaboutUsinfo: true })
      }
      const detectDevice = () => {
         this.setState({ IsModeldetectDevice: true })
         setTimeout(function () {
            $('.find-device').hide();
            $('#device-unavailable-description').show();
         }, 10000)
      }
      const Openscratchfile = () => {
         this.setState({ Isimportscratchfile: true })
      }
      const Openblocklabfile = () => {
         this.setState({ Isblocklabfile: true })
      }
      const handleClose = () => {
         this.setState({ IsModelOpen: false })
      }
      const CloseCodeconvert = () => {
         this.setState({ IsModelOpenCodeconvert: false })
      }
      const Closesharework = () => {
         this.setState({ IsModelOpensharework: false })
      }
      const Closeteachingplan = () => {
         this.setState({ IsModelOpenteachingplan: false })
      }
      
      const CloseCodeconvert2 = () => {
         this.setState({ IsModelaboutUsinfo: false })
      }
      const CloseCodeconvert3 = () => {
         this.setState({ IsModeldetectDevice: false })
      }
      const Closeimportscratch = () => {
         this.setState({ Isimportscratchfile: false })
      }
      const Closeblocklabfile = () => {
         this.setState({ Isblocklabfile: false })
      }

      const OpenblockSignfile = () => {
         this.setState({ IsblockSignfile: true })
      }
      const CloseblockSignfile = () => {
         this.setState({ IsblockSignfile: false })
      }

      return (
         <>
            <>
               {/* Modal popup  for new project start */}
               <ReactModal
                  isOpen={this.state.IsModelOpen}
                  className={Modalstyles.modalContent}
                  overlayClassName={Modalstyles.modalOverlay}
                  onRequestClose={handleClose}
               >
                  <div style={{ width: '100%', backgroundColor: 'white' }}>
                     <button className='close_new_icon' onClick={handleClose}> X </button>
                     <h2 className="text-center new_project-popup">Create Project</h2>
                     <div className="modal-body" id="exampleModal_newproject">
                        <div className="row">
                           <div className="col-md-2">
                              <div className="project-block text-center">
                                 <img src={blankimg} className="img-fluid canvas-img" alt="game-canvas" />
                                 <span>Blank project</span>
                              </div>
                           </div>
                           <div className="col-md-2">
                              <div className="project-block text-center">
                                 <img src={nproject2} className="img-fluid canvas-img" alt="game-canvas" />
                                 <span>Joystick-TankGO</span>
                              </div>
                           </div>
                           <div className="col-md-2">
                              <div className="project-block text-center">
                                 <img src={nproject3} className="img-fluid canvas-img" alt="game-canvas" />
                                 <span>Magical Pen</span>
                              </div>
                           </div>
                           <div className="col-md-2">
                              <div className="project-block text-center">
                                 <img src={nproject4} className="img-fluid canvas-img" alt="game-canvas" />
                                 <span>Shooting Training</span>
                              </div>
                           </div>
                           <div className="col-md-2">
                              <div className="project-block text-center">
                                 <img src={nproject5} className="img-fluid canvas-img" alt="game-canvas" />
                                 <span>AI Chat Robot</span>
                              </div>
                           </div>
                        </div>
                        <div className="row">
                           <div className="col-md-2">
                              <div className="project-block text-center">
                                 <img src={nproject6} className="img-fluid canvas-img" alt="game-canvas" />
                                 <span>Flower Art</span>
                              </div>
                           </div>
                           <div className="col-md-2">
                              <div className="project-block text-center">
                                 <img src={nproject7} className="img-fluid canvas-img" alt="game-canvas" />
                                 <span>Treat or Trick</span>
                              </div>
                           </div>
                           <div className="col-md-2">
                              <div className="project-block text-center">
                                 <img src={nproject8} className="img-fluid canvas-img" alt="game-canvas" />
                                 <span>Fishing Trick</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </ReactModal>
               {/* Modal popup  for new project start */}


               {/* Convert code to block popup modal start */}
               <ReactModal
                  isOpen={this.state.IsModelOpenCodeconvert}
                  className={Modalstyles.modalchangecode}
                  overlayClassName={Modalstyles.modalOverlay}
                  onRequestClose={CloseCodeconvert}
               >
                  <div style={{ width: '100%' }}>
                     <button className='convert_code_close' onClick={CloseCodeconvert}> X </button>
                     <h4 className="text-center convert-code-head">Convert Block to Code</h4>
                     <img src={convert_code} className="img-fluid convert-code-img" alt="game-canvas" />
                     <a href='javascript:void(0);' className="btn btn-success enable_code_btn">Enable Code Convert</a>
                  </div>
               </ReactModal>
               {/* Convert code to block popup modal end */}

         {/*share  work popup modal start */}
               <ReactModal
                  isOpen={this.state.IsModelOpensharework}
                  className={Modalstyles.modalchangecode}
                  overlayClassName={Modalstyles.modalOverlay}
                  onRequestClose={Closesharework}
                     >
                  <div style={{ width: '100%' }}>
                     <button className='convert_code_close' onClick={Closesharework}> X </button>
                     <h4 className="text-center convert-code-head">Scan to share or view your work-</h4>
                     <img src={sharework} className="img-fluid convert-code-img" alt="game-canvas" />
                     <a href='javascript:void(0);' className="btn btn-success enable_code_btn">Copy Link</a>
                  </div>
               </ReactModal>
               {/*share  work popup modal start */}

                {/*Teaching plan popup modal start */}
                <ReactModal
                  isOpen={this.state.IsModelOpenteachingplan}
                  className={Modalstyles.modalchangecode}
                  overlayClassName={Modalstyles.modalOverlay}
                  onRequestClose={Closeteachingplan}
                     >
                  <div style={{ width: '100%' }}>
                     <button className='teaching_plan_close' onClick={Closeteachingplan}> X </button>
                     <h4 className="text-center convert-code-head">Teaching Plan</h4>
                     <p style={{textAlign:'center'}}> Generate teaching plan with once click. <br/>Make it easier to teach others this project.</p>
                     <img src={teaching_plan} className="img-fluid convert-code-img" alt="game-canvas" />
                     <a href='javascript:void(0);' className="btn btn-success teaching_plan_btn">Generate</a>
                     <a href='javascript:void(0);'onClick={Closeteachingplan} className="btn btn-danger teaching_plan_btn">Cancel</a>
                  </div>
               </ReactModal>
              {/*Teaching plan popup modal end */}

               

               {/* scratach code popup modal start */}
               <ReactModal
                  isOpen={this.state.Isimportscratchfile}
                  className={Modalstyles.modalscratchfile}
                  overlayClassName={Modalstyles.modalOverlay}
                  onRequestClose={Closeimportscratch}
               >
                  <div style={{ width: '100%' }}>
                     <button className='convert_code_close' onClick={Closeimportscratch}> X </button>
                     <h4 className="text-center convert-code-head">Import Scratch File</h4>
                     <img src={importscratchfile} className="img-fluid convert-code-img" alt="game-canvas" />
                     <a href='javascript:void(0);' className="btn btn-success enable_code_btn">Import Scratch File</a>
                  </div>
               </ReactModal>
               {/* scratach code popup modal end */}

               {/* block lab popup modal start */}
               <ReactModal
                  isOpen={this.state.Isblocklabfile}
                  className={Modalstyles.blocklabfile}
                  overlayClassName={Modalstyles.modalOverlay}
                  onRequestClose={Closeblocklabfile}
               >
                  <div style={{ width: '100%' }}>
                     <button className='close_block_lab' onClick={Closeblocklabfile}> X </button>
                     <div className="background11"></div>
                     <div className="container11" id="login">
                        <h2 style={{ color: 'green' }}>Login on KIDS GAME</h2>

                        <div className="form-item11">
                           <input type="Email" name="text" onChange={this.Email} placeholder="username or email" />
                        </div>
                        <br />
                        <div className="form-item11">
                           <input type="password" name="pass" onChange={this.Password} placeholder="password" />
                        </div>
                        <button onClick={this.login} style={{ color: 'black' }} className='btn btn-success btn-sm'> LOGIN </button>
                        <br />
                        <p style={{ color: '#000000' }} onClick={OpenblockSignfile} >New User? <a href="#" style={{ color: 'green' }}>Create an account</a></p>
                        <br /><a href="javascript:void(0);" style={{ color: '#3e3e3e', fontWeight: 'bold' }}><small>Forgot Password</small></a>

                     </div>
                  </div>
               </ReactModal>
               {/*block lab popup modal end */}



               {/* block SignUp popup modal start */}
               <ReactModal
                  isOpen={this.state.IsblockSignfile}
                  className={Modalstyles.blocklabfile}
                  overlayClassName={Modalstyles.modalOverlay}
                  onRequestClose={CloseblockSignfile}
               >
                  <div style={{ width: '100%' }}>
                     <button className='close_block_lab' onClick={CloseblockSignfile}> X </button>
                     <div className="background11"></div>
                     <div className="container11" id="login">

                        <h2 style={{ color: 'green' }}>SignUp on KIDS GAME</h2>

                        <div className="form-item11">
                           <input type="text" name="text" onChange={this.Username} placeholder="Username" />
                        </div>
                        <br />
                        <div className="form-item11">
                           <input type="Email" name="text" onChange={this.Email} placeholder="Email" />
                        </div>
                        <br />
                        <div className="form-item11">
                           <input type="password" name="pass" onChange={this.Password} placeholder="Password" />
                        </div>
                        <br />
                        <button style={{ color: 'black' }} className='btn-success btn-sm' onClick={(this.signUp)} > SignUp </button>
                        <br />
                     </div>
                  </div>
               </ReactModal>
               {/*block SignUp popup modal end */}



            </><Box
               className={classNames(
                  this.props.className,
                  styles.menuBar
               )}
            >
               <div style={{ backgroundColor: 'rgb(35 128 0)' }} className={styles.mainMenu}>
                  {/* left side menu items starting form here */}
                  <div className={styles.fileGroup}>
                     {/* 1.logo of the project here */}
                     <div className={classNames(styles.menuBarItem)}>
                        <img
                           alt="Scratch"
                           className={classNames(styles.scratchLogo, {
                              [styles.clickable]: typeof this.props.onClickLogo !== 'undefined'
                           })}
                           draggable={false}
                           src={this.props.logo}
                           onClick={this.props.onClickLogo} />
                     </div>
                     {/* 1.logo of the project here */}
                     {/* 2.File tab main block  of the project here */}
                     {(this.props.canManageFiles) && (
                        <div
                           className={classNames(styles.menuBarItem, styles.hoverable, {
                              [styles.active]: this.props.fileMenuOpen
                           })}
                           onMouseUp={this.props.onClickFile}
                        >
                           <i className="fa fa-folder-open header-icon" aria-hidden="true"></i> &nbsp;
                           {/* File tab text block  of the project here */}
                           <FormattedMessage
                              defaultMessage="File"
                              description="Text for file dropdown menu"
                              id="gui.menuBar.file" />
                           {/* File tab text block  of the project here */}
                           <MenuBarMenu
                              className={classNames(styles.menuBarMenu)}
                              open={this.props.fileMenuOpen}
                              place={this.props.isRtl ? 'left' : 'right'}
                              onRequestClose={this.props.onRequestCloseFile}
                           >
                              <MenuSection>
                                 {/* Open Project inner tab here from file tab */}
                                 <MenuItem
                                    isRtl={this.props.isRtl}
                                    onClick={this.handleClickNew}
                                 >
                                    <i className="fa fa-folder-open-o header-icon_sub" aria-hidden="true"></i>&nbsp;
                                    {openProjectMessage}
                                 </MenuItem>
                                 {/* Open Project creating here from file tab */}
                                 {/* New Project inner tab here from file tab */}
                                 <MenuItem
                                    isRtl={this.props.isRtl}
                                    onClick={handleOpen}
                                 >
                                    <i className="fa fa-file-text header-icon_sub" aria-hidden="true"></i>&nbsp;
                                    {newProjectMessage}
                                 </MenuItem>
                                 {/* New Project inner tab here from file tab */}
                                 {/* Save Project inner tab here from file tab */}
                                 <MenuItem
                                    isRtl={this.props.isRtl}
                                    onClick={this.handleClickNew}
                                 >
                                    <i className="fa fa-floppy-o header-icon_sub" aria-hidden="true"></i>&nbsp;
                                    {saveAsProjectMessage}
                                 </MenuItem>
                                 {/* Save Project inner tab here from file tab */}
                              </MenuSection>
                              {(this.props.canSave || this.props.canCreateCopy || this.props.canRemix) && (
                                 <MenuSection>
                                    {this.props.canSave && (
                                       <MenuItem onClick={this.handleClickSave}>
                                          {saveNowMessage}
                                       </MenuItem>
                                    )}
                                    {this.props.canCreateCopy && (
                                       <MenuItem onClick={this.handleClickSaveAsCopy}>
                                          {createCopyMessage}
                                       </MenuItem>
                                    )}
                                    {this.props.canRemix && (
                                       <MenuItem onClick={this.handleClickRemix}>
                                          {remixMessage}
                                       </MenuItem>
                                    )}
                                 </MenuSection>
                              )}
                              <MenuSection>
                                 <SBFileUploader
                                    canSave={this.props.canSave}
                                    userOwnsProject={this.props.userOwnsProject}
                                  >
                                    {(className, renderFileInput, handleLoadProject) => (
                                       <MenuItem
                                          className={className}
                                          onClick={handleLoadProject}
                                       >
                                          <i className="fa fa-file-text header-icon_sub" aria-hidden="true"></i>&nbsp;
                                          {/* eslint-disable max-len */}
                                          {this.props.intl.formatMessage(sharedMessages.loadFromComputerTitle)}
                                          {/* eslint-enable max-len */}
                                          {renderFileInput()}
                                       </MenuItem>
                                    )}
                                 </SBFileUploader>
                                 <SB3Downloader>
                                    {(className, downloadProjectCallback) => (
                                       <MenuItem
                                          className={className}
                                          onClick={this.getSaveToComputerHandler(downloadProjectCallback)}
                                       >
                                          <i className="fa fa-file-o header-icon_sub" aria-hidden="true"></i> &nbsp;
                                          <FormattedMessage
                                             defaultMessage="Save to your computer"
                                             description="Menu bar item for downloading a project to your computer" // eslint-disable-line max-len
                                             id="gui.menuBar.downloadToComputer" />
                                       </MenuItem>
                                    )}
                                 </SB3Downloader>
                              </MenuSection>
                           </MenuBarMenu>
                        </div>
                     )}
                     {/* 2.File tab end here of the project */}
                     {/* 3.Tools tab end here of the project */}
                     <div
                        className={classNames(styles.menuBarItem, styles.hoverable, {
                           [styles.active]: this.props.editMenuOpen
                        })}
                        onMouseUp={this.props.onClickEdit}
                     >
                        <i className="fa fa-wrench header-icon" aria-hidden="true"></i>&nbsp;
                        <div className={classNames(styles.editMenu)}>
                           <FormattedMessage
                              defaultMessage="Tools"
                              description="Text for tools dropdown menu"
                              id="gui.menuBar.tools" />
                        </div>
                        <MenuBarMenu
                           className={classNames(styles.menuBarMenu)}
                           open={this.props.editMenuOpen}
                           place={this.props.isRtl ? 'left' : 'right'}
                           onRequestClose={this.props.onRequestCloseEdit}
                        >
                           {/* Tools tab  inner end here of the project */}
                           <MenuSection>
                              <MenuItem
                                 isRtl={this.props.isRtl}
                                 onClick={Openteachingplan}
                              >
                                 <i className="fa fa-graduation-cap header-icon_sub" aria-hidden="true"></i> &nbsp;
                                 {teachingplanMessage}
                              </MenuItem>
                              <MenuItem
                                 isRtl={this.props.isRtl}
                                 onClick={OpenCodeconvert}
                              >
                                 <i className="fa fa-code header-icon_sub" aria-hidden="true"></i>&nbsp;
                                 {convertcodeMessage}
                              </MenuItem>
                              <MenuItem
                                 isRtl={this.props.isRtl}
                                 onClick={Openscratchfile}
                              >
                                 <i className="fa fa-file-image-o header-icon_sub" aria-hidden="true"></i> &nbsp;
                                 {scratchfileMessage}
                              </MenuItem>
                           </MenuSection>
                           {/* Tools tab inner end here of the project */}
                        </MenuBarMenu>
                     </div>
                     {/* 3.tools tab end here of the project */}
                     {/*4.Search textbox tab of the project */}
                     <div
                        className={classNames(styles.menuBarItem, {
                           [styles.active]: this.props.editMenuOpen
                        })}
                     >
                        <div className={classNames(styles.editMenu)}>
                           <input type="textbox" className="form-control search-txtbox" placeholder="Undersea"></input>
                           <i className="fa fa-pencil search_editicon header-icon" aria-hidden="true"></i>
                        </div>
                     </div>
                     {/* 4.search textbox tab end here of the project */}
                     {/* 5.save tab menu */}
                     <div
                        className={classNames(styles.menuBarItem, styles.hoverable, {
                           [styles.active]: this.props.editMenuOpen
                        })}
                     >
                        <i className="fa fa-floppy-o header-icon" aria-hidden="true"></i>&nbsp;
                        <div className={classNames(styles.editMenu)}>
                           <FormattedMessage
                              defaultMessage="Save"
                              description="Text for Save main menu"
                              id="gui.menuBar.SaveTab" />
                        </div>
                     </div>
                     {/* 5.save tab menu */}
                     {/* 6.share tab menu */}
                     <div
                        className={classNames(styles.menuBarItem, styles.hoverable, {
                           [styles.active]: this.props.editMenuOpen
                        })}
                        onClick={Opensharework}
                        
                     >
                        <i className="fa fa-share-alt header-icon" aria-hidden="true"></i>&nbsp;
                        <div className={classNames(styles.editMenu)}>
                           <FormattedMessage
                              defaultMessage="Share"
                              description="Text for Share main menu"
                              id="gui.menuBar.ShareTab" />
                        </div>
                     </div>
                     {/* 6.share tab menu */}
                  </div>
                  {/* left side menu items ending form here */}
               </div>
               {/* About us content code to block popup modal start */}

               <ReactModal
                  isOpen={this.state.IsModelaboutUsinfo}
                  className={Modalstyles.about_us_popup}
                  overlayClassName={Modalstyles.modalOverlay}
                  onRequestClose={CloseCodeconvert2}
               >
                  <div style={{ width: '100%' }}>
                     <button className='about_us_close' onClick={CloseCodeconvert2}> X </button>
                     <img src={aboutusheadimg} className="img-fluid about_us_img" alt="game-canvas" />
                     <div className="row">
                        <div className="col-md-12">
                           <div className="about-us-description"><br/>
                              <p style={{ fontWeight: '600',marginBottom:'0px' }}>&nbsp;&nbsp;&nbsp;&nbsp;2021, Important function reviews:-</p>
                              <ul>
                                 <li>Optimize block style, add multiple-screen debugging. </li>
                                 <li>New block: broadcast and wait </li>
                                 <li>Support for importing Scratch local files. </li>
                                 <li>New Pen blocks, new Events block </li>
                                 <li>New Could List blocks </li>
                                 <li>New Cognitive AI </li>
                                 <li>New Hardware: Micro:bit 2018 important funciton review </li>
                                 <li>New Video blocks </li>
                                 <li>New Material library </li>
                                 <li>New sound blocks </li>
                                 <li>Ne Pen blocks </li>
                                 <li>New AI Blocks </li>
                                 <li>New private could variable blocks. </li>
                                 <li>New tools blocks </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </ReactModal>
               {/* About us content code to block popup modal start */}

               {/* device detect block popup modal start */}
               <ReactModal
                  isOpen={this.state.IsModeldetectDevice}
                  className={Modalstyles.deviceDetectModal}
                  overlayClassName={Modalstyles.modalOverlay}
                  onRequestClose={CloseCodeconvert3}
               >
                  <div style={{ width: '100%' }}>
                     <button className='device-Detect-close' onClick={CloseCodeconvert3}> X </button>
                     <div className="row">
                        <div className="col-md-12">
                           <div className="modal-body" style={{ backgroundColor: 'white' }}>
                              <img src={searchgif} alt="search-device1" className="img-fluid search-device find-device" />
                              <p className="text-center text-success find-device">Detecting Your Device, it will Take around 10 sec.</p>
                              <br />
                              <div className="row" id="device-unavailable-description">
                                 <div id="device-unavailable-inner">
                                    <div className="col-md-3">
                                       <div className="device-unavailable-block">
                                          <img src={networkError} alt="device unavable" />
                                          <span>Network 219KB/s</span>
                                       </div>
                                    </div>
                                    <div className="col-md-3">
                                       <div className="device-unavailable-block">
                                          <img src={browserError} alt="device unavable" />
                                          <span>Chrome 96</span>
                                       </div>
                                    </div>
                                    <div className="col-md-3">
                                       <div className="device-unavailable-block">
                                          <img src={webGl} alt="device unavable" />
                                          <span>Normal</span>
                                       </div>
                                    </div>
                                    <div className="col-md-3">
                                       <div className="device-unavailable-block">
                                          <img src={systemError} alt="device unavable" />
                                          <span>Windows 10X64</span>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="col-md-12">
                                    <div className="error-description">
                                       <p>The network speed is slow, which may effect the normal operation of Kitten Editor. It's recommended to use the Kitten Client-Offline. Mode Download Now</p>
                                    </div>
                                 </div>
                                 <a onClick={detectDevice} className="btn btn-success detect_again_btn" >Try again to Detect</a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </ReactModal>
               {/* device detec popup modal end */}

               {/* show the proper UI in the account menu, given whether the user is
logged in, and whether a session is available to log in with */}
               <div className={styles.accountInfoGroup} style={{ backgroundColor: 'green', marginRight: '05px' }}>
                  {/* right side menu icons   start here*/}
                  <React.Fragment>
                     {/* Add hardware device icon block start */}
                     {(this.props.canChangeLanguage) && (<div
                        className={classNames(styles.menuBarItem, styles.hoverable, styles.languageMenu)}
                        onClick={this.props.onExtensionButtonClick}
                     >
                        <div>
                           {/* <span style={{ fontSize: '25px' }}>&#128187;</span> */}
                           <img src={add_hardware} className="img-fluid right_menu_icon" alt="Added Hardware" />
                        </div>
                     </div>)}
                     {/* Add hardware device icon block start */}
                     {/* block label icon block start */}
                     {(this.props.canChangeLanguage) && (<div
                        className={classNames(styles.menuBarItem, styles.hoverable, styles.languageMenu)}
                        onClick={this.props.onExtensionButtonClick}
                     >
                        <div>
                           <img src={add_blocks} className="img-fluid right_menu_icon" alt="Added Hardware" />
                        </div>
                     </div>)}
                     {/* block label icon end */}
                     {/* setting icon block start */}
                     <div id="setting_menu">
                        {(this.props.canChangeLanguage) && (<div
                           className={classNames(styles.menuBarItem, styles.hoverable, styles.languageMenu)}
                        >
                           <div className="setting-row">
                              <img src={setting} className="img-fluid right_menu_icon" alt="Setting icon" />
                              <div className="setting_block">
                                 <ul>
                                    <li> <a onClick={this.props.onOpenTipLibrary}><i className="fa fa-handshake-o header-icon" aria-hidden="true"></i>&nbsp; Guidanace </a></li>
                                    <li><a href="javascript:void(0);"><i className="fa fa-code header-icon" aria-hidden="true"></i>&nbsp; Open Source </a></li>
                                    <li><a onClick={handleOpen}><i className="fa fa-book header-icon" aria-hidden="true"></i>&nbsp; Sample Project</a></li>
                                    <li><a href="javascript:void(0);"><i className="fa fa-child header-icon" aria-hidden="true"></i>&nbsp; Kitten Wiki</a></li>
                                    <li><a onClick={detectDevice}><i className="fa fa-laptop header-icon" aria-hidden="true"></i>&nbsp; Device Detect</a></li>
                                    <li><a onClick={aboutUsinfo}><i className="fa fa-info-circle header-icon" aria-hidden="true"></i>&nbsp; About Us</a></li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                        )}
                     </div>
                     {/* setting icon block end */}
                     {/* language icon block start */}
                     {(this.props.canChangeLanguage) && (<div
                        className={classNames(styles.menuBarItem, styles.hoverable, styles.languageMenu)}
                     >
                        <div>
                           &nbsp;<i className="fa fa-language language-icon" aria-hidden="true"></i>
                        </div>
                        <LanguageSelector label={this.props.intl.formatMessage(ariaMessages.language)} />
                     </div>)}
                     {/* language icon block end */}
                     {/* login icon block start */}
                     <div className="login-right-block">
                        {(this.props.canChangeLanguage) && (
                           <div
                              className={classNames(styles.menuBarItem, styles.languageMenu)}
                           >
                              <span
                                 onClick={Openblocklabfile}
                              ><i className="fa fa-sign-in header-icon" aria-hidden="true"></i> &nbsp;Login</span>

                           </div>
                        )}
                     </div>
                     {/* login icon block start */}
                  </React.Fragment>
                  {/* right side menu icons  end here*/}
               </div>
               {aboutButton}
            </Box>
         </>
      );
   }
}
MenuBar.propTypes = {
   accountMenuOpen: PropTypes.bool,
   authorId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
   authorThumbnailUrl: PropTypes.string,
   authorUsername: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
   autoUpdateProject: PropTypes.func,
   canChangeLanguage: PropTypes.bool,
   canCreateCopy: PropTypes.bool,
   canCreateNew: PropTypes.bool,
   canEditTitle: PropTypes.bool,
   canManageFiles: PropTypes.bool,
   canRemix: PropTypes.bool,
   canSave: PropTypes.bool,
   canShare: PropTypes.bool,
   className: PropTypes.string,
   confirmReadyToReplaceProject: PropTypes.func,
   editMenuOpen: PropTypes.bool,
   enableCommunity: PropTypes.bool,
   fileMenuOpen: PropTypes.bool,
   intl: intlShape,
   isRtl: PropTypes.bool,
   isShared: PropTypes.bool,
   isShowingProject: PropTypes.bool,
   isUpdating: PropTypes.bool,
   languageMenuOpen: PropTypes.bool,
   locale: PropTypes.string.isRequired,
   loginMenuOpen: PropTypes.bool,
   logo: PropTypes.string,
   onClickAbout: PropTypes.func,
   onClickAccount: PropTypes.func,
   onClickEdit: PropTypes.func,
   onClickFile: PropTypes.func,
   onClickLanguage: PropTypes.func,
   onClickLogin: PropTypes.func,
   onClickLogo: PropTypes.func,
   onClickNew: PropTypes.func,
   onClickRemix: PropTypes.func,
   onClickSave: PropTypes.func,
   onClickSaveAsCopy: PropTypes.func,
   onLogOut: PropTypes.func,
   onOpenRegistration: PropTypes.func,
   onOpenTipLibrary: PropTypes.func,
   onProjectTelemetryEvent: PropTypes.func,
   onRequestCloseAccount: PropTypes.func,
   onRequestCloseEdit: PropTypes.func,
   onRequestCloseFile: PropTypes.func,
   onRequestCloseLanguage: PropTypes.func,
   onRequestCloseLogin: PropTypes.func,
   onSeeCommunity: PropTypes.func,
   onShare: PropTypes.func,
   onToggleLoginOpen: PropTypes.func,
   projectTitle: PropTypes.string,
   renderLogin: PropTypes.func,
   sessionExists: PropTypes.bool,
   shouldSaveBeforeTransition: PropTypes.func,
   showComingSoon: PropTypes.bool,
   userOwnsProject: PropTypes.bool,
   username: PropTypes.string,
   onExtensionButtonClick: PropTypes.func,
   vm: PropTypes.instanceOf(VM).isRequired,
   Openblocklabfile: PropTypes.func,//from Deepak
   OpenblockSignfile:PropTypes.func,// from Rajneesh
};
MenuBar.defaultProps = {
   logo: scratchLogo,
   onShare: () => { }
};
const mapStateToProps = (state, ownProps) => {
   const loadingState = state.scratchGui.projectState.loadingState;
   const user = state.session && state.session.session && state.session.session.user;
   return {
      accountMenuOpen: accountMenuOpen(state),
      fileMenuOpen: fileMenuOpen(state),
      editMenuOpen: editMenuOpen(state),
      isRtl: state.locales.isRtl,
      isUpdating: getIsUpdating(loadingState),
      isShowingProject: getIsShowingProject(loadingState),
      languageMenuOpen: languageMenuOpen(state),
      locale: state.locales.locale,
      loginMenuOpen: loginMenuOpen(state),
      projectTitle: state.scratchGui.projectTitle,
      sessionExists: state.session && typeof state.session.session !== 'undefined',
      username: user ? user.username : null,
      userOwnsProject: ownProps.authorUsername && user &&
         (ownProps.authorUsername === user.username),
      vm: state.scratchGui.vm
   };
};
const mapDispatchToProps = dispatch => ({
   autoUpdateProject: () => dispatch(autoUpdateProject()),
   onOpenTipLibrary: () => dispatch(openTipsLibrary()),
   onClickAccount: () => dispatch(openAccountMenu()),
   onRequestCloseAccount: () => dispatch(closeAccountMenu()),
   onClickFile: () => dispatch(openFileMenu()),
   onRequestCloseFile: () => dispatch(closeFileMenu()),
   onClickEdit: () => dispatch(openEditMenu()),
   onRequestCloseEdit: () => dispatch(closeEditMenu()),
   onClickLanguage: () => dispatch(openLanguageMenu()),
   onRequestCloseLanguage: () => dispatch(closeLanguageMenu()),
   onClickLogin: () => dispatch(openLoginMenu()),
   onRequestCloseLogin: () => dispatch(closeLoginMenu()),
   onClickNew: needSave => dispatch(requestNewProject(needSave)),
   onClickRemix: () => dispatch(remixProject()),
   onClickSave: () => dispatch(manualUpdateProject()),
   onClickSaveAsCopy: () => dispatch(saveProjectAsCopy()),
   onSeeCommunity: () => dispatch(setPlayer(true))
});
export default compose(
   injectIntl,
   MenuBarHOC,
   connect(
      mapStateToProps,
      mapDispatchToProps
   )
)(MenuBar);