// dialog for posting new snippets
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { languages } from "./languages";
import Autocomplete from "@mui/material/Autocomplete";
import { config } from "./Constants";
import { useNavigate } from "react-router-dom";

export default function PostDialog(props) {
    const { onClose, open } = props;
    const navigate = useNavigate();

    const postForm = useFormik({
        initialValues: {
            author: 1,
            pub_date: new Date().toISOString(),
            title: "",
            category: "Python",
            content: "",
        },
        onSubmit: async (values) => {
            // get token -- user must login to post
            const token = localStorage.getItem("jwt_access_token");
            const postURL = `${config.url}/api/create/snippet/`;
            const response = await fetch(postURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // JWT token for auth
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                handleCloseDialog();
                navigate("/");
            }
        },
    });

    const handleCloseDialog = () => {
        onClose(0);
    };

    const handleCancel = () => {
        console.log("cancel is clicked::");
        handleCloseDialog();
    };

    return (
        <Dialog
            onClose={handleCloseDialog}
            open={open}
            className="h-128 w-128"
            aria-label="post dialog"
        >
            <DialogTitle component="h3">Create a new snippet</DialogTitle>
            <DialogContent>
                Share your code snippet with people, helping them with
                programming questions!
            </DialogContent>

            <DialogContent>
                <form onSubmit={postForm.handleSubmit}>
                    <div className="flex flex-row justify-between">
                        <TextField
                            id="title"
                            label="Title"
                            className="w-7/12"
                            sx={{ marginBottom: "8px" }}
                            onChange={postForm.handleChange}
                            value={postForm.values.title}
                        />
                        <Autocomplete
                            disablePortal
                            id="category"
                            options={languages}
                            className="w-4/12"
                            sx={{ marginBottom: "8px" }}
                            onChange={(e, value) =>
                                postForm.setFieldValue("category", value)
                            }
                            value={postForm.values.category}
                            renderInput={(params) => (
                                <TextField {...params} label="Category" />
                            )}
                        />
                    </div>
                    <TextField
                        id="content"
                        label="Snippet Draft"
                        multiline
                        className="w-full"
                        rows={16}
                        onChange={postForm.handleChange}
                        value={postForm.values.content}
                    />
                    <DialogActions>
                        <Button
                            onClick={handleCancel}
                            color="primary"
                            variant="contained"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                        >
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}
