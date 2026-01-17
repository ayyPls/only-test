const degToRad = (degrees: number) => {
    return (degrees % 360) * (Math.PI / 180)
}

export { degToRad }