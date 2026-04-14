import { useCallback, useEffect, useState } from "react";
import { type StringInputProps, set, unset, useClient } from "sanity";

export default function DepartmentInput(props: StringInputProps) {
  const { value, onChange, readOnly } = props;
  const client = useClient({ apiVersion: "2024-01-01" });

  const [departments, setDepartments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    client
      .fetch<string[] | null>(`*[_type == "siteSettings"][0].departments`)
      .then((result) => {
        setDepartments(result ?? []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("DepartmentInput fetch error:", err);
        setError(err?.message ?? "Failed to load departments");
        setLoading(false);
      });
  }, [client]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const next = e.target.value;
      onChange(next ? set(next) : unset());
    },
    [onChange],
  );

  if (loading) {
    return <span style={{ color: "#888" }}>Loading departments…</span>;
  }

  if (error) {
    return (
      <span style={{ color: "#b00" }}>
        Error loading departments: {error}
      </span>
    );
  }

  if (departments.length === 0) {
    return (
      <span style={{ color: "#b00" }}>
        No departments configured. Add departments in{" "}
        <strong>Site Settings → Team Departments</strong>.
      </span>
    );
  }

  const valueNotInList = value && !departments.includes(value);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <select
        value={value ?? ""}
        onChange={handleChange}
        disabled={readOnly}
        style={{
          padding: "8px 12px",
          borderRadius: 4,
          border: "1px solid #ccc",
          fontSize: 14,
          background: "#fff",
        }}
      >
        <option value="">Select a department…</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
        {valueNotInList && (
          <option value={value}>{value} (removed)</option>
        )}
      </select>
      {valueNotInList && (
        <span style={{ color: "#b00", fontSize: 12 }}>
          &ldquo;{value}&rdquo; is no longer in the departments list. Please
          select a current department or re-add it in Site Settings.
        </span>
      )}
    </div>
  );
}
