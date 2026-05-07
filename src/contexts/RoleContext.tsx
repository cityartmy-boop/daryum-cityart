import { createContext, useContext, ReactNode } from "react";

export type UserRole = 
  | "platform_admin" 
  | "owner" 
  | "manager" 
  | "cleaner" 
  | "maintenance" 
  | "accountant";

export interface RolePermissions {
  // Dashboard Access
  canViewDashboard: boolean;
  canViewAdminPanel: boolean;
  
  // Properties & Units
  canManageProperties: boolean;
  canViewProperties: boolean;
  canManageUnits: boolean;
  canViewUnits: boolean;
  
  // Reservations & Calendar
  canManageReservations: boolean;
  canViewReservations: boolean;
  canViewCalendar: boolean;
  
  // Messages
  canManageMessages: boolean;
  canViewMessages: boolean;
  
  // Housekeeping
  canManageHousekeeping: boolean;
  canViewHousekeeping: boolean;
  canViewOwnTasks: boolean;
  
  // Maintenance
  canManageMaintenance: boolean;
  canViewMaintenance: boolean;
  canViewOwnTickets: boolean;
  
  // Finance & Reports
  canManageFinance: boolean;
  canViewFinance: boolean;
  canViewReports: boolean;
  canViewOwnStatements: boolean;
  
  // Users & Settings
  canManageUsers: boolean;
  canManageSettings: boolean;
  
  // Owners
  canManageOwners: boolean;
  canViewOwners: boolean;
}

const rolePermissionsMap: Record<UserRole, RolePermissions> = {
  platform_admin: {
    canViewDashboard: true,
    canViewAdminPanel: true,
    canManageProperties: true,
    canViewProperties: true,
    canManageUnits: true,
    canViewUnits: true,
    canManageReservations: true,
    canViewReservations: true,
    canViewCalendar: true,
    canManageMessages: true,
    canViewMessages: true,
    canManageHousekeeping: true,
    canViewHousekeeping: true,
    canViewOwnTasks: false,
    canManageMaintenance: true,
    canViewMaintenance: true,
    canViewOwnTickets: false,
    canManageFinance: true,
    canViewFinance: true,
    canViewReports: true,
    canViewOwnStatements: false,
    canManageUsers: true,
    canManageSettings: true,
    canManageOwners: true,
    canViewOwners: true,
  },
  owner: {
    canViewDashboard: true,
    canViewAdminPanel: false,
    canManageProperties: false,
    canViewProperties: true,
    canManageUnits: false,
    canViewUnits: true,
    canManageReservations: false,
    canViewReservations: true,
    canViewCalendar: true,
    canManageMessages: false,
    canViewMessages: false,
    canManageHousekeeping: false,
    canViewHousekeeping: false,
    canViewOwnTasks: false,
    canManageMaintenance: false,
    canViewMaintenance: false,
    canViewOwnTickets: false,
    canManageFinance: false,
    canViewFinance: true,
    canViewReports: true,
    canViewOwnStatements: true,
    canManageUsers: false,
    canManageSettings: false,
    canManageOwners: false,
    canViewOwners: false,
  },
  manager: {
    canViewDashboard: true,
    canViewAdminPanel: false,
    canManageProperties: true,
    canViewProperties: true,
    canManageUnits: true,
    canViewUnits: true,
    canManageReservations: true,
    canViewReservations: true,
    canViewCalendar: true,
    canManageMessages: true,
    canViewMessages: true,
    canManageHousekeeping: true,
    canViewHousekeeping: true,
    canViewOwnTasks: false,
    canManageMaintenance: true,
    canViewMaintenance: true,
    canViewOwnTickets: false,
    canManageFinance: false,
    canViewFinance: true,
    canViewReports: true,
    canViewOwnStatements: false,
    canManageUsers: false,
    canManageSettings: true,
    canManageOwners: false,
    canViewOwners: true,
  },
  cleaner: {
    canViewDashboard: false,
    canViewAdminPanel: false,
    canManageProperties: false,
    canViewProperties: false,
    canManageUnits: false,
    canViewUnits: false,
    canManageReservations: false,
    canViewReservations: false,
    canViewCalendar: false,
    canManageMessages: false,
    canViewMessages: false,
    canManageHousekeeping: false,
    canViewHousekeeping: true,
    canViewOwnTasks: true,
    canManageMaintenance: false,
    canViewMaintenance: false,
    canViewOwnTickets: false,
    canManageFinance: false,
    canViewFinance: false,
    canViewReports: false,
    canViewOwnStatements: false,
    canManageUsers: false,
    canManageSettings: false,
    canManageOwners: false,
    canViewOwners: false,
  },
  maintenance: {
    canViewDashboard: false,
    canViewAdminPanel: false,
    canManageProperties: false,
    canViewProperties: false,
    canManageUnits: false,
    canViewUnits: false,
    canManageReservations: false,
    canViewReservations: false,
    canViewCalendar: false,
    canManageMessages: false,
    canViewMessages: false,
    canManageHousekeeping: false,
    canViewHousekeeping: false,
    canViewOwnTasks: false,
    canManageMaintenance: false,
    canViewMaintenance: true,
    canViewOwnTickets: true,
    canManageFinance: false,
    canViewFinance: false,
    canViewReports: false,
    canViewOwnStatements: false,
    canManageUsers: false,
    canManageSettings: false,
    canManageOwners: false,
    canViewOwners: false,
  },
  accountant: {
    canViewDashboard: true,
    canViewAdminPanel: false,
    canManageProperties: false,
    canViewProperties: true,
    canManageUnits: false,
    canViewUnits: true,
    canManageReservations: false,
    canViewReservations: true,
    canViewCalendar: false,
    canManageMessages: false,
    canViewMessages: false,
    canManageHousekeeping: false,
    canViewHousekeeping: false,
    canViewOwnTasks: false,
    canManageMaintenance: false,
    canViewMaintenance: false,
    canViewOwnTickets: false,
    canManageFinance: true,
    canViewFinance: true,
    canViewReports: true,
    canViewOwnStatements: false,
    canManageUsers: false,
    canManageSettings: false,
    canManageOwners: false,
    canViewOwners: true,
  },
};

interface RoleContextValue {
  role: UserRole;
  permissions: RolePermissions;
  setRole: (role: UserRole) => void;
  hasPermission: (permission: keyof RolePermissions) => boolean;
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  // Default to manager role - في الإنتاج، سيأتي من AuthContext
  const [role, setRole] = useState<UserRole>("manager");
  const permissions = rolePermissionsMap[role];

  const hasPermission = (permission: keyof RolePermissions): boolean => {
    return permissions[permission];
  };

  return (
    <RoleContext.Provider value={{ role, permissions, setRole, hasPermission }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within RoleProvider");
  }
  return context;
}