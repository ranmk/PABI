import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: [
      {
        path: '/dashboard/overview',
        title: 'Overview',
        icon: 'bi bi-eye',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/dashboard/purchase',
        title: 'Purchase',
        icon: 'bi bi-cart',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/dashboard/finance',
        title: 'Finance',
        icon: 'bi bi-currency-dollar',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  },

  {
    path: '/about',
    title: 'Predictions',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: [
      {
        path: '/about/classification',
        title: 'Classification',
        icon: 'bi bi-diagram-3', // Example icon for Classification
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/about/clustering',
        title: 'Clustering',
        icon: 'bi bi-graph-up', // Example icon for Clustering
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/about/detection-anomaly',
        title: 'Detection Anomaly',
        icon: 'bi bi-shield-exclamation', // Example icon for Anomaly Detection
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/about/margin',
        title: 'Margin',
        icon: 'bi bi-percent', // Example icon for Margin
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/about/payment-delay',
        title: 'Payment Delay',
        icon: 'bi bi-clock-history', // Example icon for Payment Delay
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/about/pred-profit',
        title: 'Pred Profit',
        icon: 'bi bi-cash-coin', // Example icon for Pred Profit
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/about/regression',
        title: 'Regression',
        icon: 'bi bi-sliders',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  }
];
