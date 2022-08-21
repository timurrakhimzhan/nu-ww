import styles from "./QrGeneratorForm.module.scss";
import {Button, FormControl, FormLabel, Input,
    NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper} from "@chakra-ui/react";
import React, {FormEventHandler, useEffect, useState} from "react";
import {trpc} from "../../utils/trpc";
import moderatorPanelStore from "../../utils/moderator-panel-store";

type QrGeneratorFormProps = {
    eventId: number;
    minPoints: number;
    maxPoints: number;
}

const QrGeneratorForm: React.FC<QrGeneratorFormProps> = ({minPoints, maxPoints, eventId}) => {
    const {mutate, isLoading, data} = trpc.useMutation('moderator.generate-token');
    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement)
        const points = Number(formData.get('points'));
        mutate({points, eventId});
    }
    useEffect(() => {
        if(!data) {
            return;
        }
        moderatorPanelStore.setHashInfo(data);
    }, [data])
    return <form className={styles.wrapper} onSubmit={handleSubmit}>
        <FormControl>
            <FormLabel color={'whitesmoke'}>
                Tokens to assign (min: {minPoints}, max: {maxPoints}):
            </FormLabel>
            <NumberInput step={1}
                defaultValue={minPoints}
                placeholder={'Number of tokens'}
                background={'whitesmoke'}
                min={minPoints}
                max={maxPoints}
                name={'points'}
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper/>
                    <NumberDecrementStepper/>
                </NumberInputStepper>
            </NumberInput>
        </FormControl>
        <Button isLoading={isLoading} disabled={isLoading} type={'submit'}>Generate QR</Button>
    </form>
}
export default QrGeneratorForm;