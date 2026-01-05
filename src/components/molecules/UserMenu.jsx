/**
 * Molecule component that displays authenticated user info
 * and provides logout action.
 *
 * Props:
 * - user: object → authenticated user data (username, isAdmin)
 * - onLogout: function → logout handler
 */

import Avatar from "../atoms/Avatar"
import LogoutButton from "../atoms/LogoutButton"

export default function UserMenu({ user, onLogout }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-xl bg-slate-50 border border-slate-200">
        <Avatar username={user.username} />
        <div className="leading-tight hidden sm:block">
          <div className="text-sm font-semibold text-slate-800">
            {user.username}
          </div>
          {user.isAdmin && (
            <div className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Administrator
            </div>
          )}
        </div>
      </div>
      <LogoutButton onClick={onLogout} />
    </div>
  )
}