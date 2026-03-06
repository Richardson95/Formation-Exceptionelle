<template>
  <AdminLayout>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-xl font-bold text-gray-900">User Management</h2>
        <p class="text-gray-500 text-sm">Manage all registered users and their roles</p>
      </div>
      <div class="flex gap-2">
        <div class="relative">
          <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input v-model="search" type="text" placeholder="Search users..." class="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
        </div>
        <select v-model="roleFilter" class="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
          <option value="">All Roles</option>
          <option>admin</option><option>instructor</option><option>participant</option>
        </select>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div v-for="stat in userStats" :key="stat.label" class="stat-card py-4">
        <div class="text-2xl font-bold text-gray-900">{{ stat.value }}</div>
        <div class="text-sm text-gray-500">{{ stat.label }}</div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="table-header">
              <th class="px-5 py-4 text-left">User</th>
              <th class="px-5 py-4 text-left">Role</th>
              <th class="px-5 py-4 text-left">Joined</th>
              <th class="px-5 py-4 text-left">Status</th>
              <th class="px-5 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {{ (user.firstName?.[0] || '') + (user.lastName?.[0] || '') }}
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 text-sm">{{ user.firstName }} {{ user.lastName }}</p>
                    <p class="text-gray-500 text-xs">{{ user.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-4">
                <span class="badge text-xs capitalize"
                  :class="{
                    'bg-purple-100 text-purple-700': user.role === 'admin',
                    'bg-gold-100 text-gold-700': user.role === 'instructor',
                    'bg-blue-100 text-blue-700': user.role === 'participant',
                  }"
                >{{ user.role }}</span>
              </td>
              <td class="px-5 py-4 text-gray-600 text-sm">
                {{ user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '–' }}
              </td>
              <td class="px-5 py-4">
                <span class="flex items-center gap-1.5 text-sm">
                  <span class="w-2 h-2 rounded-full bg-green-400"></span>
                  <span class="text-gray-600 text-xs">Active</span>
                </span>
              </td>
              <td class="px-5 py-4">
                <div class="flex items-center gap-2">
                  <button @click="viewUser(user)" class="text-xs text-purple-700 hover:underline font-medium">View</button>
                  <button
                    @click="changeRole(user)"
                    class="text-xs text-blue-600 hover:underline font-medium"
                  >Change Role</button>
                  <button class="text-xs text-red-500 hover:underline font-medium">Suspend</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty state -->
      <div v-if="filteredUsers.length === 0" class="text-center py-16">
        <UsersIcon class="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p class="text-gray-500">No users found</p>
      </div>
    </div>

    <!-- User Detail Modal -->
    <Transition name="modal">
      <div v-if="selectedUser" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
          <div class="flex items-start gap-4 mb-5">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-bold text-xl">
              {{ (selectedUser.firstName?.[0] || '') + (selectedUser.lastName?.[0] || '') }}
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-900">{{ selectedUser.firstName }} {{ selectedUser.lastName }}</h3>
              <p class="text-gray-500 text-sm">{{ selectedUser.email }}</p>
              <span class="badge text-xs capitalize mt-1" :class="{ 'badge-purple': selectedUser.role === 'admin', 'badge-gold': selectedUser.role === 'instructor', 'bg-blue-100 text-blue-700': selectedUser.role === 'participant' }">{{ selectedUser.role }}</span>
            </div>
          </div>
          <div class="space-y-2 text-sm mb-5">
            <div class="flex justify-between py-2 border-b border-gray-50">
              <span class="text-gray-500">User ID</span><span class="font-medium text-gray-900 text-xs">{{ selectedUser.id }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-gray-50">
              <span class="text-gray-500">Joined</span><span class="font-medium">{{ selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : '–' }}</span>
            </div>
            <div class="flex justify-between py-2">
              <span class="text-gray-500">Profession</span><span class="font-medium">{{ selectedUser.profession || '–' }}</span>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="btn-primary flex-1 text-sm py-2.5">Send Email</button>
            <button @click="selectedUser = null" class="btn-secondary flex-1 text-sm py-2.5">Close</button>
          </div>
        </div>
      </div>
    </Transition>
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import { useAuthStore } from '@/stores/auth'
import { MagnifyingGlassIcon, UsersIcon } from '@heroicons/vue/24/outline'
import { toast } from 'vue3-toastify'

const authStore = useAuthStore()
const search = ref('')
const roleFilter = ref('')
const selectedUser = ref(null)

const allUsers = computed(() => authStore.getAllUsers())

const filteredUsers = computed(() => {
  let users = allUsers.value
  if (search.value) {
    const q = search.value.toLowerCase()
    users = users.filter(u =>
      u.email?.toLowerCase().includes(q) ||
      u.firstName?.toLowerCase().includes(q) ||
      u.lastName?.toLowerCase().includes(q)
    )
  }
  if (roleFilter.value) users = users.filter(u => u.role === roleFilter.value)
  return users
})

const userStats = computed(() => [
  { label: 'Total Users', value: allUsers.value.length },
  { label: 'Instructors', value: allUsers.value.filter(u => u.role === 'instructor').length },
  { label: 'Participants', value: allUsers.value.filter(u => u.role === 'participant').length },
])

function viewUser(user) { selectedUser.value = user }
function changeRole(user) { toast.info('Role management coming soon') }
</script>
