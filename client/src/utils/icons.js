import {
  Home,
  Car,
  Utensils,
  Zap,
  Heart,
  Film,
  ShoppingBag,
  Plane,
  Book,
  MoreHorizontal,
  Briefcase,
  Code,
  TrendingUp,
  Gift,
  PlusCircle,
  DollarSign,
  TrendingDown,
  Target,
  Wallet,
  CreditCard,
  PiggyBank,
  Receipt,
  BarChart3,
  Calendar,
  Filter,
  Search,
  X,
  Check,
  AlertCircle,
  Info,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Menu,
  Settings,
  LogOut,
  Edit,
  Trash2,
  Plus,
  Minus,
} from 'lucide-react';

// Icon mapping for categories (matches backend seed data)
const iconMap = {
  // Expense category icons
  home: Home,
  car: Car,
  utensils: Utensils,
  zap: Zap,
  heart: Heart,
  film: Film,
  'shopping-bag': ShoppingBag,
  plane: Plane,
  book: Book,
  'more-horizontal': MoreHorizontal,

  // Income category icons
  briefcase: Briefcase,
  code: Code,
  'trending-up': TrendingUp,
  gift: Gift,
  'plus-circle': PlusCircle,

  // Additional utility icons
  'dollar-sign': DollarSign,
  'trending-down': TrendingDown,
  target: Target,
  wallet: Wallet,
  'credit-card': CreditCard,
  'piggy-bank': PiggyBank,
  receipt: Receipt,
  'bar-chart': BarChart3,
  calendar: Calendar,
  filter: Filter,
  search: Search,
  x: X,
  check: Check,
  'alert-circle': AlertCircle,
  info: Info,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  menu: Menu,
  settings: Settings,
  'log-out': LogOut,
  edit: Edit,
  trash: Trash2,
  plus: Plus,
  minus: Minus,
};

/**
 * Get icon component by name
 * @param {string} iconName - Icon identifier (e.g., 'home', 'car')
 * @returns {React.Component} Lucide icon component
 */
export function getIcon(iconName) {
  return iconMap[iconName] || MoreHorizontal; // Default fallback icon
}

/**
 * Get all available icon names
 * @returns {string[]} Array of icon names
 */
export function getAvailableIcons() {
  return Object.keys(iconMap);
}

export default iconMap;
