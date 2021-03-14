import appStatusRoutes from './app';
import wifiRoutes from './wifi';
import cheeseTrendRoutes from './cheese-trend';
import cleaningHistoryRoutes from './cleaning-history';
import bladeHistoryRoutes from './blade-history';
import machineFaultRoutes from './machine-fault';
import productionDataRoutes from './production-data';
import cvRoutes from './cv';

const initializeAppRoutes = (app) => {
    // App Status
    app.use('/api/app', appStatusRoutes);

    // Wifi
    app.use('/api/wifi', wifiRoutes);

    // Cheese Trends
    app.use('/api/cheese-trends', cheeseTrendRoutes);

    // Cleaning History
    app.use('/api/cleaning-histories', cleaningHistoryRoutes);

    // Lifetime History
    app.use('/api/blade-histories', bladeHistoryRoutes);

    // Machine Faults
    app.use('/api/machine-faults', machineFaultRoutes);

    // Production Data
    app.use('/api/production-data', productionDataRoutes);

    // CV Routes
    app.use('/api/cv', cvRoutes);
};

export default initializeAppRoutes;
