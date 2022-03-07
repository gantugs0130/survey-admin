const Pagination = (totalElements, number, size) => {
    return {
        total: totalElements,
        current: number + 1,
        pageSize: size,
        position: ["topRight", "bottomRight"],
        showSizeChanger: true,
        showTotal: (all, range) =>
            `${size * number}-${
                size * number + size >= all ? all : size * number + size
            } , from ${all} `,
    };
};
export default Pagination;
