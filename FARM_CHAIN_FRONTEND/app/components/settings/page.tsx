'use client'
import { useState } from 'react';
import {
  User,
  Bell,
  Lock,
  Palette,
  LogOut,
  Camera,
  X,
  Eye,
  EyeOff,
  Check,
  Shield,
  Moon,
  Sun,
  Monitor,
  Mail,
  Smartphone,
  FileText,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { useTheme } from 'next-themes'
import {useCurrentUser} from '@/app/components/currentUser';

interface Profile {
  name: string;
  email: string;
  location: string;
}

interface Notifications {
  email: boolean;
  push: boolean;
  monthly: boolean;
}

interface PasswordState {
  current: string;
  new: string;
  confirm: string;
  showCurrent: boolean;
  showNew: boolean;
  showConfirm: boolean;
}

type ThemeOption = 'system' | 'light' | 'dark';

export default function SettingsPage() {

  const [profile, setProfile] = useState<Profile>({
    name: 'John Greenfield',
    email: 'john.greenfield@example.com',
    location: 'Nakuru, Kenya',
  });
  const [editing, setEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState<Profile>(profile);
  const [image, setImage] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k83MyoiH43lpI6Y-TY17A2JCPudD_7Av9A&s');
  const [preview, setPreview] = useState<string | null>(null);
  
  const [notifications, setNotifications] = useState<Notifications>({
    email: true,
    push: false,
    monthly: true,
  });
  const { theme, setTheme } = useTheme();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [password, setPassword] = useState<PasswordState>({
    current: '',
    new: '',
    confirm: '',
    showCurrent: false,
    showNew: false,
    showConfirm: false,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleSaveProfile = () => {
    setProfile(tempProfile);
    if (preview) {
      setImage(preview);
    }
    setPreview(null);
    setEditing(false);
    showSuccessMessage();
  };

  const handleCancelEdit = () => {
    setTempProfile(profile);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setEditing(false);
  };

  const handleStartEdit = () => {
    setTempProfile(profile);
    setEditing(true);
  };

  const handleToggleNotification = (key: keyof Notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    showSuccessMessage();
  };

  const handlePasswordSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      alert('New passwords do not match!');
      return;
    }
    if (password.new.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }
    setShowPasswordModal(false);
    setPassword({ 
      current: '', 
      new: '', 
      confirm: '', 
      showCurrent: false,
      showNew: false,
      showConfirm: false,
    });
    showSuccessMessage();
  };

const handleThemeChange = (newTheme: ThemeOption) => {
  setTheme(newTheme); // next-themes will persist & update automatically
  showSuccessMessage();
};

const user = useCurrentUser();

  const showSuccessMessage = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      alert('You have been logged out.');
    }
  };

  const themeIcons: Record<ThemeOption, typeof Monitor> = {
    system: Monitor,
    light: Sun,
    dark: Moon,
  };

  const notificationIcons: Record<keyof Notifications, typeof Mail> = {
    email: Mail,
    push: Smartphone,
    monthly: FileText,
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? ' bg-gray-00' : ' bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50'} pb-8`}>
      <div className="max-w-7xl ">
        {/* Success Toast */}
        {showSuccess && (
          <div className="fixed top-4 right-4 z-50 animate-[slideIn_0.3s_ease-out]">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-green-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center space-x-2 sm:space-x-3">
              <div className="bg-green-100 p-1.5 sm:p-2 rounded-full">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <span className="font-semibold text-sm sm:text-base text-gray-800">Saved!</span>
            </div>
          </div>
        )}

        {/* Header */}
        <div className={`bg-gradient-to-br ${theme === 'dark' ? 'bg-black text-white' : ' from-green-600 via-emerald-600 to-teal-600'} rounded-2xl sm:rounded-3xl shadow-2xl text-white p-5 sm:p-8 lg:p-12 mb-6 sm:mb-8 relative overflow-hidden border border-gray-100`}>
          <div 
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30">

          </div>
          
          <div className="relative z-10 flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black mb-2 sm:mb-3 flex items-center space-x-2 sm:space-x-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-xl sm:rounded-2xl">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 lg:w-10 lg:h-10" />
                </div>
                <span>Account Settings</span>
              </h1>
              <p className="text-green-50 text-sm sm:text-base lg:text-xl font-medium">
                Personalize your experience 🌱
              </p>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative group">
                <img
                  src={preview || image}
                  alt="Profile"
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl border-4 border-white/50 shadow-2xl object-cover transition-transform group-hover:scale-105"
                />
                
                {/* {preview && (
                  <button
                    onClick={() => {
                      URL.revokeObjectURL(preview);
                      setPreview(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 p-1 sm:p-1.5 rounded-full text-white shadow-lg hover:bg-red-600 transition"
                  >
                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                )} */}

                {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-xl sm:rounded-2xl transition-opacity flex items-center justify-center">
                  <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div> */}

                

              </div>
              <label className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm font-bold bg-white/20 backdrop-blur-md px-3 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl hover:bg-white/30 transition cursor-pointer shadow-lg">
                <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className=" xs:inline">Change</span>
                <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
              </label>
            </div>
          </div>
        </div>

        {/* Main Content */}
        
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Profile & Security */}

          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Profile Card */}
            <div className={`${theme === 'dark' ? 'bg-black text-white rounded-2xl' : 'bg-white text-black'} sm:rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-8 lg:p-10 hover:shadow-2xl transition-shadow`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 sm:mb-6 space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-green-100 p-2 sm:p-3 rounded-xl sm:rounded-2xl">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className={`text-xl sm:text-2xl font-black ${theme === 'dark' ? 'bg-black text-white' : 'text-gray-800'}`}>Profile</h2>
                    <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-500'} text-xs sm:text-sm`}>Personal details</p>
                  </div>
                </div>
              </div>

              {!editing ? (
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className={`${theme === 'dark' ? '' : 'bg-gray-50'} rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-100`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <User className={`w-3 h-3 sm:w-4 sm:h-4 ${theme === 'dark' ? '' : 'text-gray-800'}`} />
                        <span className={`text-xs font-semibold ${theme === 'dark' ? '' : 'text-gray-800'} uppercase tracking-wide`}>Full Name</span>
                      </div>
                      <p className={`font-bold ${theme === 'dark' ? '' : 'text-gray-800'} text-base sm:text-lg`}>{user.user?.currentUser}</p>
                    </div>
                    
                    <div className={`${theme === 'dark' ? '' : 'bg-gray-50'} rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-100`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <Mail className={`w-3 h-3 sm:w-4 sm:h-4 ${theme === 'dark' ? '' : 'text-gray-800'}`}/>
                        <span className={`text-xs font-semibold ${theme === 'dark' ? '' : 'text-gray-800'} uppercase tracking-wide`}>Email</span>
                      </div>
                      <p className={`font-bold ${theme === 'dark' ? '' : 'text-gray-800'} text-sm sm:text-lg break-all`}>{user.user?.email}</p>
                    </div>
                  </div>
                  <div className={`${theme === 'dark' ? '' : 'bg-gray-50'} rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-100`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className={`w-3 h-3 sm:w-4 sm:h-4 ${theme === 'dark' ? '' : 'text-gray-800'}`}/>
                      <span className={`text-xs font-semibold ${theme === 'dark' ? '' : 'text-gray-800'} uppercase tracking-wide`}>Location</span>
                    </div>
                    <p className={`font-bold ${theme === 'dark' ? '' : 'text-gray-800'} text-sm sm:text-lg`}>{user.user?.location}</p>
                  </div>
                  <button
                    onClick={handleStartEdit}
                    className="w-full sm:w-full px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl sm:rounded-2xl hover:from-green-700 hover:to-emerald-700 font-bold transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
                  >
                    Edit Profile
                  </button>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className={`flex items-center space-x-2 text-xs sm:text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-2`}>
                        <User className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Full Name</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={tempProfile.name}
                        onChange={handleProfileChange}
                        className="w-full border-2 border-gray-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-sm sm:text-base focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className={`flex items-center space-x-2 text-xs sm:text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-2`}>
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Email</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={tempProfile.email}
                        onChange={handleProfileChange}
                        className="w-full border-2 border-gray-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-sm sm:text-base focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`flex items-center space-x-2 text-xs sm:text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-2`}>
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Location</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={tempProfile.location}
                      onChange={handleProfileChange}
                      className="w-full border-2 border-gray-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-sm sm:text-base focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition"
                      placeholder="Enter your location"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-2">
                    <button
                      onClick={handleSaveProfile}
                      className="flex-1 sm:flex-none px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl sm:rounded-2xl hover:from-green-700 hover:to-emerald-700 font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-sm sm:text-base"
                    >
                      <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 sm:flex-none px-6 sm:px-8 py-3 sm:py-3.5 bg-gray-100 text-gray-700 rounded-xl sm:rounded-2xl hover:bg-gray-200 font-bold transition-all flex items-center justify-center space-x-2 text-sm sm:text-base"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Security Card */}
            <div className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-8 lg:p-10 hover:shadow-2xl transition-shadow`}>
              <div className="flex items-center space-x-2 sm:space-x-3 mb-5 sm:mb-6">
                <div className="bg-amber-100 p-2 sm:p-3 rounded-xl sm:rounded-2xl">
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                </div>
                <div>
                  <h2 className={`text-xl sm:text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Security</h2>
                  <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-500'} text-xs sm:text-sm"`}>Protect your account</p>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">

                {/* password */}
                <div className={` ${theme === 'dark' ? '' : 'bg-gradient-to-r from-amber-50 to-orange-50'} rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-amber-100 hover:shadow-md transition-shadow`}>
                  <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between space-y-3 xs:space-y-0">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="bg-amber-100 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                        <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className={`font-bold text-sm sm:text-base ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Password</h3>
                        <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`}>Last changed 3 months ago</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowPasswordModal(true)}
                      className="w-full xs:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-amber-600 text-white rounded-lg sm:rounded-xl hover:bg-amber-700 font-bold transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
                    >
                      Change
                    </button>
                  </div>
                </div>

                {/* two-factor auth */}
                <div className={` ${theme === 'dark' ? '' : 'bg-gradient-to-r from-blue-50 to-indigo-50'} rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-100 hover:shadow-md transition-shadow`}>
                  <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between space-y-3 xs:space-y-0">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="bg-blue-100 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className={`font-bold text-sm sm:text-base ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Two-Factor Auth</h3>
                        <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`}>Extra security layer</p>
                      </div>
                    </div>
                    <button className="w-full xs:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 font-bold transition-all shadow-md hover:shadow-lg text-sm sm:text-base">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Right Column - Preferences */}
          <div className="space-y-4 sm:space-y-6">
            {/* Notifications Card */}
            <div className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white'} rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-6 lg:p-8 hover:shadow-2xl transition-shadow`}>
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="bg-blue-100 p-2 sm:p-3 rounded-xl sm:rounded-2xl">
                  <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className={`text-lg sm:text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Notifications</h2>
                  <p className={`text-lg sm:text-xl font-black ${theme === 'dark' ? 'text-white text-xs' : 'text-gray-500 text-xs'}`}>Manage alerts</p>
                </div>
              </div>
              <ul className="space-y-3 sm:space-y-4">
                {(Object.entries({
                  email: 'Email Notifications',
                  push: 'Push Notifications',
                  monthly: 'Monthly Reports',
                }) as [keyof Notifications, string][]).map(([key, label]) => {
                  const Icon = notificationIcons[key];
                  return (
                    <li key={key} className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-100 hover:bg-gray-100 transition-colors">
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center space-x-2 sm:space-x-3 flex-1 mr-3">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                          <span className="font-semibold text-xs sm:text-sm text-gray-700">{label}</span>
                        </div>
                        <div className="relative flex-shrink-0">
                          <input
                            type="checkbox"
                            checked={notifications[key]}
                            onChange={() => handleToggleNotification(key)}
                            className="sr-only peer"
                          />
                          <div className="w-10 h-5 sm:w-12 sm:h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors"></div>
                          <div className="absolute left-0.5 top-0.5 sm:left-1 sm:top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5 sm:peer-checked:translate-x-6 shadow-md"></div>
                        </div>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Appearance Card */}
            <div className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white'} rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-6 lg:p-8 hover:shadow-2xl transition-shadow`}>
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="bg-purple-100 p-2 sm:p-3 rounded-xl sm:rounded-2xl">
                  <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className={`text-lg sm:text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Appearance</h2>
                  <p className={`${theme === 'dark' ? 'text-white text-xs' : 'text-gray-500 text-xs'}`}>Customize theme</p>
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {(['system', 'light', 'dark'] as ThemeOption[]).map((themeOption) => {
                  const Icon = themeIcons[themeOption];
                  const isSelected = theme === themeOption;
                  return (
                    <button
                      key={themeOption}
                      onClick={() => handleThemeChange(themeOption)}
                      className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all ${
                        isSelected
                          ? 'bg-purple-50 border-purple-500 shadow-md'
                          : 'bg-gray-50 border-gray-200 hover:border-purple-300 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isSelected ? 'text-purple-600' : 'text-gray-400'}`} />
                        <span className={`font-semibold capitalize text-sm sm:text-base ${isSelected ? 'text-purple-700' : 'text-gray-700'}`}>
                          {themeOption}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="bg-purple-500 p-1 rounded-full">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Logout Card */}
            <div className="bg-red-500 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-3 sm:p-3 lg:p-2 hover:shadow-2xl transition-shadow">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 sm:space-x-3  text-white hover:text-gray-800 font-bold transition-colors py-2 sm:py-3 text-sm sm:text-xl"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative animate-[slideUp_0.3s_ease-out]">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 bg-gray-100 p-1.5 sm:p-2 rounded-full hover:bg-gray-200 transition"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            <div className="flex items-center space-x-2 sm:space-x-3 mb-5 sm:mb-6">
              <div className="bg-amber-100 p-2 sm:p-3 rounded-xl sm:rounded-2xl">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-800">Change Password</h2>
                <p className="text-xs sm:text-sm text-gray-500">Keep your account secure</p>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {[
                { field: 'current' as const, label: 'Current Password' },
                { field: 'new' as const, label: 'New Password' },
                { field: 'confirm' as const, label: 'Confirm Password' },
              ].map(({ field, label }) => {
                const showKey = `show${field.charAt(0).toUpperCase() + field.slice(1)}` as keyof PasswordState;
                return (
                  <div key={field}>
                    <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                      {label}
                    </label>
                    <div className="relative">
                      <input
                        type={password[showKey] ? 'text' : 'password'}
                        value={password[field]}
                        onChange={(e) =>
                          setPassword((p) => ({ ...p, [field]: e.target.value }))
                        }
                        className="w-full border-2 border-gray-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 pr-12 text-sm sm:text-base focus:ring-4 focus:ring-amber-100 focus:border-amber-500 outline-none transition"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setPassword((p) => ({
                            ...p,
                            [showKey]: !p[showKey],
                          }))
                        }
                        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                      >
                        {password[showKey] ? (
                          <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
              
              <div className="bg-amber-50 border border-amber-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 mt-4">
                <p className="text-xs text-amber-800 font-medium">
                  Password must be at least 8 characters long
                </p>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-3.5 bg-gray-100 text-gray-700 rounded-xl sm:rounded-2xl hover:bg-gray-200 font-bold transition-all text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordSubmit}
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl sm:rounded-2xl hover:from-amber-700 hover:to-orange-700 font-bold transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  Save Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}