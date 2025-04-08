export default function RegisterForm({ onChange, formData, countries }) {
  return (
    <>
      {/* full name */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="name"
        >
          Full Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            value={formData.name}
            required
            onChange={(e) => onChange(e)}
            placeholder="Enter full name"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {/* email */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="email"
        >
          E-mail
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="email"
            name="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(e) => onChange(e)}
            placeholder="Enter your email"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {/* password */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="password"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            autoComplete="new-password"
            required
            placeholder="Enter Password"
            onChange={(e) => onChange(e)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {/* conform password */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="conform-password"
        >
          Confirm Password
        </label>
        <div className="mt-1">
          <input
            type="password"
            id="conform-password"
            name="confirmPassword"
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={(e) => onChange(e)}
            placeholder="Enter conform password"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {/* country */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="country"
        >
          Country
        </label>
        <div className="mt-1">
          <select
            id="country"
            name="country"
            autoComplete="country"
            required
            value={formData.country}
            onChange={(e) => onChange(e)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select your country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* city */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="city"
        >
          City
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="city"
            name="city"
            autoComplete=""
            value={formData.city}
            onChange={(e) => onChange(e)}
            required
            placeholder="Enter your city"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {/* languages */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="languages"
        >
          Languages
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="languages"
            name="languages"
            autoComplete="languages"
            required
            value={formData.languages}
            onChange={(e) => onChange(e)}
            placeholder="English, Spanish, French, Hebrew...."
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {/* bio */}
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="bio"
        >
          Bio
        </label>
        <div className="mt-1">
          <textarea
            type="text"
            id="bio"
            name="bio"
            rows="3"
            onChange={(e) => onChange(e)}
            value={formData.bio}
            required
            placeholder="Enter your bio"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>
      </div>
    </>
  );
}
