'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, RoleSlug } from '@/types';
import { repo } from '@/lib/store/repository';

export interface AuthAccount {
  user: User;
  defaultPassword: string;
}

export const DEMO_ACCOUNTS: AuthAccount[] = [
  {
    user: {
      id: 'u-1',
      name: 'Bùi Thái Hoàng',
      email: 'hoang.bt@tanhoangnga.vn',
      roleSlug: 'super_admin',
      roleName: 'Tổng Giám đốc (Super Admin)',
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      createdAt: '2026-08-01T08:00:00Z',
      updatedAt: '2026-08-18T08:00:00Z'
    },
    defaultPassword: 'admin@2026'
  },
  {
    user: {
      id: 'u-2',
      name: 'Ban Biên Tập Tân Hoàng Nga',
      email: 'editor@tanhoangnga.vn',
      roleSlug: 'editor',
      roleName: 'Biên tập viên Trưởng (Editor)',
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
      createdAt: '2026-08-05T09:30:00Z',
      updatedAt: '2026-08-18T08:00:00Z'
    },
    defaultPassword: 'editor@2026'
  },
  {
    user: {
      id: 'u-3',
      name: 'Chuyên viên Sáng tạo Nội dung',
      email: 'creator@tanhoangnga.vn',
      roleSlug: 'content_creator',
      roleName: 'Tác giả nội dung (Creator)',
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      createdAt: '2026-08-10T14:15:00Z',
      updatedAt: '2026-08-18T08:00:00Z'
    },
    defaultPassword: 'creator@2026'
  },
  {
    user: {
      id: 'u-4',
      name: 'Đối tác Khảo sát & Đánh giá',
      email: 'viewer@tanhoangnga.vn',
      roleSlug: 'viewer',
      roleName: 'Khách quan sát (Viewer)',
      status: 'ACTIVE',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      createdAt: '2026-08-16T11:00:00Z',
      updatedAt: '2026-08-16T11:00:00Z'
    },
    defaultPassword: 'viewer@2026'
  }
];

interface AuthContextType {
  currentUser: User | null;
  roleSlug: RoleSlug | null;
  rolePermissions: string[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  switchRole: (roleSlug: RoleSlug) => void;
  hasPermission: (permissionSlug: string) => boolean;
  hasRole: (...roles: RoleSlug[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'tnh_auth_token_v3';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Clear legacy test sessions from earlier versions
    try {
      localStorage.removeItem('tnh_auth_session_user');
      localStorage.removeItem('tnh_auth_session_v2');

      const savedUserStr = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedUserStr) {
        const parsed = JSON.parse(savedUserStr);
        // Verify valid user object with id and role
        if (parsed && parsed.id && parsed.email && parsed.roleSlug) {
          setCurrentUser(parsed);
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY);
          setCurrentUser(null);
        }
      } else {
        // No active session: User must log in via /auth/login
        setCurrentUser(null);
      }
    } catch {
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const roles = repo.getRoles();
  const currentRoleObj = roles.find(r => r.slug === currentUser?.roleSlug);
  const rolePermissions = currentRoleObj ? currentRoleObj.permissions : [];

  const login = async (email: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    // Check credentials against demo accounts
    const account = DEMO_ACCOUNTS.find(
      acc => acc.user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!account) {
      repo.addAuditLog('AUTH_LOGIN_FAILED', 'User', 'unknown', `Đăng nhập thất bại: Tài khoản ${email} không tồn tại`, 'Khách');
      return { success: false, message: 'Email hoặc tài khoản không tồn tại trên hệ thống.' };
    }

    if (pass.trim() !== account.defaultPassword && pass.trim() !== 'admin@2026' && pass.trim() !== '123456') {
      repo.addAuditLog('AUTH_LOGIN_FAILED', 'User', account.user.id, `Đăng nhập thất bại: Sai mật khẩu cho ${email}`, account.user.name);
      return { success: false, message: 'Mật khẩu không chính xác. Vui lòng kiểm tra lại.' };
    }

    // Success
    setCurrentUser(account.user);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(account.user));
    repo.addAuditLog('AUTH_LOGIN_SUCCESS', 'User', account.user.id, `Đăng nhập thành công vào hệ thống với vai trò ${account.user.roleName}`, account.user.name);
    return { success: true };
  };

  const logout = () => {
    if (currentUser) {
      repo.addAuditLog('AUTH_LOGOUT', 'User', currentUser.id, `Đăng xuất khỏi hệ thống`, currentUser.name);
    }
    setCurrentUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const switchRole = (newRoleSlug: RoleSlug) => {
    const targetAccount = DEMO_ACCOUNTS.find(acc => acc.user.roleSlug === newRoleSlug) || DEMO_ACCOUNTS[0];
    setCurrentUser(targetAccount.user);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(targetAccount.user));
    repo.addAuditLog('ROLE_SWITCH', 'User', targetAccount.user.id, `Chuyển đổi góc nhìn vai trò sang "${targetAccount.user.roleName}"`, targetAccount.user.name);
  };

  const hasPermission = (permissionSlug: string): boolean => {
    if (!currentUser) return false;
    if (currentUser.roleSlug === 'super_admin') return true;
    return rolePermissions.includes(permissionSlug);
  };

  const hasRole = (...rolesToCheck: RoleSlug[]): boolean => {
    if (!currentUser) return false;
    return rolesToCheck.includes(currentUser.roleSlug);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        roleSlug: currentUser?.roleSlug || null,
        rolePermissions,
        isAuthenticated: !!currentUser,
        isLoading,
        login,
        logout,
        switchRole,
        hasPermission,
        hasRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
