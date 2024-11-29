import React, { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { Pencil, Trash2, ShieldPlus } from 'lucide-react';
import toast from 'react-hot-toast';

export function RoleManagement() {
  const { roles, addRole, updateRole, deleteRole } = useAdminStore();
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  const [editingRole, setEditingRole] = useState<string | null>(null);

  const availablePermissions = ['read', 'write', 'delete', 'moderate', 'admin'];

  const handleAddRole = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      addRole(newRole);
      setNewRole({ name: '', permissions: [] });
      setIsAddingRole(false);
      toast.success('Role added successfully');
    } catch (error) {
      toast.error('Failed to add role');
    }
  };

  const handleUpdateRole = (id: string, data: any) => {
    try {
      updateRole(id, data);
      setEditingRole(null);
      toast.success('Role updated successfully');
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  const handleDeleteRole = (id: string) => {
    try {
      deleteRole(id);
      toast.success('Role deleted successfully');
    } catch (error) {
      toast.error('Failed to delete role');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Role Management</h2>
        <button
          onClick={() => setIsAddingRole(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <ShieldPlus className="h-4 w-4 mr-2" />
          Add Role
        </button>
      </div>

      {isAddingRole && (
        <form onSubmit={handleAddRole} className="mb-6 p-4 border rounded-lg">
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Role Name"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
              className="border rounded px-3 py-2"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Permissions
              </label>
              <div className="space-y-2">
                {availablePermissions.map((permission) => (
                  <label key={permission} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newRole.permissions.includes(permission)}
                      onChange={(e) => {
                        const updatedPermissions = e.target.checked
                          ? [...newRole.permissions, permission]
                          : newRole.permissions.filter((p) => p !== permission);
                        setNewRole({ ...newRole, permissions: updatedPermissions });
                      }}
                      className="rounded border-gray-300 text-blue-600 mr-2"
                    />
                    {permission}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsAddingRole(false)}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Role
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Count
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((role) => (
              <tr key={role.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingRole === role.id ? (
                    <input
                      type="text"
                      value={role.name}
                      onChange={(e) =>
                        handleUpdateRole(role.id, { name: e.target.value })
                      }
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    role.name
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingRole === role.id ? (
                    <div className="space-y-1">
                      {availablePermissions.map((permission) => (
                        <label key={permission} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={role.permissions.includes(permission)}
                            onChange={(e) => {
                              const updatedPermissions = e.target.checked
                                ? [...role.permissions, permission]
                                : role.permissions.filter((p) => p !== permission);
                              handleUpdateRole(role.id, {
                                permissions: updatedPermissions,
                              });
                            }}
                            className="rounded border-gray-300 text-blue-600 mr-2"
                          />
                          {permission}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((permission) => (
                        <span
                          key={permission}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{role.userCount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        editingRole === role.id
                          ? setEditingRole(null)
                          : setEditingRole(role.id)
                      }
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteRole(role.id)}
                      className="text-red-600 hover:text-red-900"
                      disabled={role.userCount > 0}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}