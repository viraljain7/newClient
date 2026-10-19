import {
  Box,
  Button,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import api from "../../shared/BaseApi";
// import api from "../../../../shared/ApiManager";

const FilterDrawer = ({
  open,
  onClose,
  filterableColumns,
  filters,
  activeFilterCount,
  onFilterChange,
  onClearAll,
  onApply,
}) => {

  // -------------------- STATE --------------------
  const [userOptions, setUserOptions] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // -------------------- HELPERS --------------------
  const getKey = (col) => col.filter?.key || col.field;
  const getLabel = (col) => col.filter?.label || col.headerName;

  // -------------------- FETCH USERS --------------------
  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await api.get("/users"); // 🔁 change endpoint if needed
      setUserOptions(res.data?.data || []);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    // only hit /users when a select filter actually needs the retailer list
    const hasUserSelect = filterableColumns.some((col) => col.filter?.type === 'select' && col.filter?.key === 'user_id');
    if (open && hasUserSelect) {
      fetchUsers(); // fetch only when drawer opens
    }
  }, [open, filterableColumns]);

  // -------------------- RENDER --------------------
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 360,
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={700}>
            Filters {activeFilterCount > 0 && `(${activeFilterCount} active)`}
          </Typography>

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        {/* Filters */}
        {filterableColumns.map((col) => {
          const key = getKey(col);

          // ---------------- SELECT FILTER ----------------
          if (col.filter?.type === "select") {
            const isUserFilter = col.filter.key === "user_id";

            const options = isUserFilter
              ? userOptions
              : col.filter.options || [];

            return (
              <FormControl key={key} fullWidth>
                <InputLabel>{getLabel(col)}</InputLabel>

                <Select
                  value={filters[key] || ""}
                  label={getLabel(col)}
                  onChange={(e) => onFilterChange(key, e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>

                  {/* USER DROPDOWN (API) */}
                  {isUserFilter ? (
                    loadingUsers ? (
                      <MenuItem disabled>Loading users...</MenuItem>
                    ) : options.length > 0 ? (
                      options.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.name} ({user.id})
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No users found</MenuItem>
                    )
                  ) : (
                    // STATIC OPTIONS
                    options.map((opt) => (
                      <MenuItem key={opt} value={opt}>
                        {opt.replace(/-/g, " ").toUpperCase()}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            );
          }

          // ---------------- TEXT / NUMBER FILTER ----------------
          const isNumber = col.filter?.type === 'number';

          return (
            <TextField
              key={key}
              fullWidth
              type={isNumber ? 'number' : 'text'}
              label={getLabel(col)}
              value={filters[key] || ''}
              onChange={(e) => {
                const raw = e.target.value;
                // pass a real number for number filters (empty stays empty)
                onFilterChange(key, isNumber ? (raw === '' ? '' : Number(raw)) : raw);
              }}
              slotProps={{
                htmlInput: isNumber ? { min: 0, inputMode: 'numeric' } : undefined
              }}
            />
          );
        })}

        {/* Actions */}
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button fullWidth variant="outlined" onClick={onClearAll}>
            Clear All
          </Button>

          <Button fullWidth variant="contained" onClick={onApply ?? onClose}>
            Apply
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default FilterDrawer;
