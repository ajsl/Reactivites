import React, { FormEvent } from "react";
import { useState } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity | null | undefined;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  submitting: boolean;
}

export const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialFormState,
  createActivity,
  editActivity,
  submitting
}) => {
  const initialiseForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initialiseForm);

  const handleSubmit = () => {
      if (activity.id.length === 0){
        let newActivity = {
          ...activity,
          id: uuid()
        }
        console.log('created activity')
        createActivity(newActivity);
      } else {
        editActivity(activity);
      }
  }

  const handelInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={() => handleSubmit()}>
        <Form.Input
          name="title"
          onChange={handelInputChange}
          placeholder="Title"
          value={activity.title}
        />
        <Form.TextArea
          rows={2}
          name="description"
          onChange={handelInputChange}
          placeholder="Description"
          value={activity.description}
        />
        <Form.Input
          name="category"
          onChange={handelInputChange}
          placeholder="Category"
          value={activity.category}
        />
        <Form.Input
          name="date"
          onChange={handelInputChange}
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
        />
        <Form.Input
          name="city"
          onChange={handelInputChange}
          placeholder="City"
          value={activity.city}
        />
        <Form.Input
          name="venue"
          onChange={handelInputChange}
          placeholder="Venue"
          value={activity.venue}
        />
        <Button
          floated="right"
          onChange={handelInputChange}
          positive
          type="submit"
          content="Submit"
          loading={submitting}
        />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={() => setEditMode(false)}
        />
      </Form>
    </Segment>
  );
};
