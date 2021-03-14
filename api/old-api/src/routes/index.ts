const router = require('express').Router();
const controller = require("../controller");

// HTTP GET Requests
router.route('/getbladehistory').get(controller.getBladeHistory);
router.route('/getcvinfo').get(controller.getCVInfo);
router.route('/gettimezone').get(controller.getTimeZone);
router.route('/getcheesetrenddata').get(controller.cheeseTrendData);
router.route('/getmachinefaultlist').get(controller.getMachineFaultList);
router.route('/getbladenumcuts').get(controller.getBladeNumCuts);
router.route('/gettodayspizzpepcount').get(controller.getTodaysPizzPepCount);
router.route('/getdrycyclescount').get(controller.getDryCyclesCount);
router.route('/getwificonnectstatus').get(controller.getWiFiConnectStatus);
router.route('/getwifinetworks').get(controller.getWiFiNetworks);

// HTTP PUT Requests
router.route('/button').put(controller.button);
router.route('/getcleaningdata').put(controller.getCleaningData);
router.route('/getproddata').put(controller.getProdData);
router.route('/getlastcleaned').put(controller.getLastCleaned);
router.route('/setcvinfo').put(controller.setCVInfo);
router.route('/settimezone').put(controller.setTimeZone);
router.route('/addcleaningdata').put(controller.addCleaningData);
router.route('/resetbladecutcount').put(controller.resetBladeCutCount);
router.route('/setwificredentials').put(controller.setWiFiCredentials);

// HTTP POST Requests
router.route('/cvlogin').post(controller.cvLogin);
router.route('/vars').post(controller.vars);

export { router };
